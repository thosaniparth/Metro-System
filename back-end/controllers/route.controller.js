const Route = require('../models/route.model');

exports.addRoute = (req,res) =>
{
    var s = req.body.a.toLowerCase().trim();
    var d = req.body.b.toLowerCase().trim();
    Route.findOne({ $or: [{ a: s, b: d },{ b: s, a: d }] },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while adding route', error: err });
        }
        else
        {
            if(ans)
            {
                res.status(401).send({ message: 'Route already exists' });
            }
            else
            {
                var route = new Route(
                    {
                        a: s,
                        b: d,
                        price: req.body.price
                    }
                );
                route.save((er) =>
                {
                    if(er)
                    {
                        res.status(500).send({ message: 'Error while adding Route',error: er });
                    }
                    else
                    {
                        res.status(200).send({ message: 'Route added successfully' });
                    }
                })
            }
        }
    });
};

exports.viewRoutes = (req,res) =>
{
    Route.find({},(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while finding routes' });
        }
        else
        {
            res.status(200).send(ans);
        }
    })
};
const Coupon = require('../models/coupon.model');
const User = require('../models/user.model');

exports.addCoupon = (req,res) =>
{
    Coupon.findOne({ code: req.body.code },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while adding coupon', error: err });
        }
        else
        {
            if(ans)
            {
                res.status(401).send({ message: 'Coupon already exists' });
            }
            else
            {
                var coupon = new Coupon(
                    {
                        code: req.body.code,
                        percentageOff: req.body.percentageOff,
                        timeAdded: new Date()
                    }
                );
                if(req.body.percentageOff<0)
                {
                    res.status(401).send({ message: 'Invalid Percentage for Discount' });
                }
                else
                {
                    coupon.save((er) =>
                    {
                        if(er)
                        {
                            res.status(500).send({ message: 'Error while adding Coupon',error: er });
                        }
                        else
                        {
                            res.status(200).send({ message: 'Coupon added successfully' });
                        }
                    });
                }
            }
        }
    });
};

exports.applyCoupon = (req,res) =>
{
    User.findOne({ username: req.body.username },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while Checking user info',error: err });
        }
        else
        {
            if(ans)
            {
                var used = ans.usedCouponCodes.includes(req.body.code);
                if(used)
                {
                    res.status(401).send({ message: 'Coupon Used Already' });
                }
                else
                {
                    Coupon.findOne({ code: req.body.code },(er,an) =>
                    {
                        if(er)
                        {
                            res.status(500).send({ message: 'Error while fetching Coupon information',error: er });
                        }
                        else
                        {
                            if(an)
                            {
                                var price = req.body.price;
                                var x = 100 - an.percentageOff;
                                var y = x/100;
                                y.toFixed(2);
                                price = y*price;
                                res.status(200).send({ message: 'Discount Applied', finalPrice: price });
                            }
                            else
                            {
                                res.status(404).send({ message: 'Coupon not found' });
                            }
                        }
                    });
                }
            }
            else
            {
                res.status(404).send({ message: 'User not found, please register' });
            }
        }
    });
};

exports.viewCoupons = (req,res) =>
{
    User.findOne({ username: req.query.username }, (err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while Checking user info',error: err });
        }
        else
        {
            if(ans)
            {
                if(!ans.admin)
                {
                    Coupon.find({ code: { $nin: ans.usedCouponCodes } },(er,an) =>
                    {
                        if(er)
                        {
                            res.status(500).send({ message: 'Error while fetching Coupon information', error:er });
                        }
                        else
                        {
                            res.status(200).send(an);
                        }
                    });
                }
                else
                {
                    Coupon.find({},(er,an) =>
                    {
                        if(er)
                        {
                            res.status(500).send({ message: 'Error while fetching Coupon information', error:er });
                        }
                        else
                        {
                            res.status(200).send(an);
                        }
                    });
                }
            }
            else
            {
                res.status(404).send({ message: 'User does not exist' });
            }
        }
    });
};
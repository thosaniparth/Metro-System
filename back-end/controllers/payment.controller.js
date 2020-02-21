const Payment = require('../models/payment.model');
const User = require('../models/user.model');

exports.pay = (req,res) =>
{
    User.findOne({ username: req.body.username },(error,answer) =>
    {
        if(error)
        {
            res.status(500).send({ message: 'Error while Checking user info', error: error });
        }
        else
        {
            if(answer)
            {
                var finalPrice = 0;
                var couponCode = null;
                if(req.body.couponCodeApplied)
                {
                    finalPrice = req.body.finalPrice;
                    couponCode = req.body.couponCode;
                }
                else
                {
                    finalPrice = req.body.price;
                }
                if(finalPrice<answer.walletBalance)
                {
                    var payment = new Payment(
                        {
                            username: answer.username,
                            a: req.body.a,
                            b: req.body.b,
                            couponCodeApplied: req.body.couponCodeApplied,
                            couponCode: couponCode,
                            orgPrice: req.body.price,
                            finalPrice: finalPrice
                        }
                    );
                    payment.save((er) =>
                    {
                        if(er)
                        {
                            res.status(500).send({ message: 'Payment Failed' });
                        }
                        else
                        {
                            if(couponCode!=null)
                            {
                                answer.usedCouponCodes.push(couponCode);
                            }
                            var newBalance = answer.walletBalance - finalPrice;
                            User.updateOne({ username: answer.username },{ walletBalance: newBalance, usedCouponCodes: answer.usedCouponCodes },(erro) =>
                            {
                                if(erro)
                                {
                                    Payment.deleteOne({ username: answer.username, couponCode: couponCode },(e) =>
                                    {
                                        if(e)
                                        {
                                            res.status(500).send({ message: 'Account Updation Failed, Payment Done' });
                                        }
                                        else
                                        {
                                            res.status(500).send({ message: 'Account Updation Failed' });
                                        }
                                    });
                                }
                                else
                                {
                                    res.status(200).send({ message: 'Payment Successful' });
                                }
                            });
                        }
                    })
                }
                else
                {
                    res.status(401).send({ message: 'Insufficient Balance in Wallet' });
                }
            }
            else
            {
                res.status(404).send({ message: 'User not found, please register' });
            }
        }
    });
}

exports.viewPayments = (req,res) =>
{
    var query = {};
    if(req.query.admin=='false')
    {
        query = { username: req.query.username }
    }
    else
    {
        query = {};
    }
    Payment.find(query,(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while fetching Payment Information', error: err });
        }
        else
        {
            if(ans)
            {
                res.status(200).send(ans);
            }
            else
            {
                res.status(404).send({ message: 'User does not exist, please register' });
            }
        }
    })
};
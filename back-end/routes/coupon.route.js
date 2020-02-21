var express = require('express');
var router = express.Router();
var cC = require('../controllers/coupon.controller');

router.post('/addCoupon',cC.addCoupon);
router.post('/applyCoupon',cC.applyCoupon);
router.get('/viewCoupons',cC.viewCoupons);

module.exports = router;
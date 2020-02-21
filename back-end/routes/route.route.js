var express = require('express');
var router = express.Router();
var rC = require('../controllers/route.controller');

router.post('/addRoute',rC.addRoute);
router.get('/viewRoutes',rC.viewRoutes);

module.exports = router;
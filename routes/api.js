var router = require('express').Router();

var analisysController = require('../app/controller/analisysController');

router.get('/searchItemTrade', analisysController.searchItemTrade);
router.get('/queryItems', analisysController.queryItems);

module.exports = router;

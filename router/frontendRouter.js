const express = require('express');
const router = express.Router();
const frontendCro = require('../controller/frontendController.js')

router.get('/getAllCate', frontendCro.getAllCate);

router.get('/getArt', frontendCro.getArt);

module.exports = router;
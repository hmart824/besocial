const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router has started');

router.get('/' , homeController.home);
router.use('/users' , require('./usres'));
router.use('/posts' , require('./posts'));

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/posts_controller');


router.get('/post' , postController.posts);
router.post('/create' ,passport.checkAuthentication , postController.create);
router.get('/destroy' ,passport.checkAuthentication , postController.destroy);

module.exports = router;
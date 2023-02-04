const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/user_profile_controller');
const postController = require('../controllers/post_controller');

router.get('/profile' , userProfileController.profile);
router.get('/posts' , postController.posts);

module.exports = router;
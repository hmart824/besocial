const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/reset_password_controller');



router.get('/' , resetPasswordController.resetPassword);
router.post('/get-email' , resetPasswordController.getEmail);
router.post('/update/:accessToken' , resetPasswordController.update)

module.exports = router;
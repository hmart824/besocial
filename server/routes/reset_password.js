const express = require('express');
const router = express.Router();
const resetPasswordsController = require('../controllers/reset_passwords_controller');



router.get('/' , resetPasswordsController.resetPassword);
router.post('/get-email' , resetPasswordsController.getEmail);
router.post('/update/:accessToken' , resetPasswordsController.update)

module.exports = router;
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile', passport.checkAuthentication , usersController.profile);
router.get('/sign-in' , usersController.signIn);
router.get('/sign-up' , usersController.signUp);
router.get('/sign-out' , usersController.destroySession);

router.post('/create' , usersController.create);
router.post('/create-session' ,passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), usersController.createSession);
router.post('/update', passport.checkAuthentication , usersController.update);

router.get('/auth/google' , passport.authenticate('google' , {scope: ['profile' , 'email']}));
router.get('/auth/google/callback' , passport.authenticate(
    'google' ,
     {failureRedirect: '/users/sign-in'})
     , usersController.createSession);
router.use('/reset-password' , require('./reset_password'));
router.get('/toggle-friendship/:id', passport.checkAuthentication , usersController.toggleFriendship);




module.exports = router;
const passport = require('passport');
const env = require('./environment');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
    } , (accessToken , refreshToken , profile , done)=>{
        User.findOne({email: profile.emails[0].value}).exec((err , user)=>{
            if(err){
                console.log('error in finding user in google strategy passport');
                return;
            }
            console.log(profile);
            if(user){
                return done(null , user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                } , (err , user)=>{
                    if(err){
                        console.log('error in creating user in google strategy passport');
                        return;
                    }
                    return done(null , user);
                })
            }
        })
    }
));

module.exports = passport;
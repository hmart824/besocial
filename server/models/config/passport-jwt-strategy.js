const passport = require('passport');
const JWtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
};

passport.use(new JWtStrategy(opts , (jwt_payload , done)=>{
    User.findById(jwt_payload._id , (err , user)=>{
        if(err){
            console.log('error in finding the user from jwt')
            return;
        }
        if(user){
            return done(null , user);
        }else{
            return done(null , false);
        }
    });
}));

module.exports = passport;
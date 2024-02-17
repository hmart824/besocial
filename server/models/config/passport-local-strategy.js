const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},(req ,email , password ,done)=>{
    //find a user and establish the identity
    User.findOne({email: email} , (err , user)=>{
        if(err){
            req.flash('error' , err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error' , 'Invalid username/password!');
            return done(null , false);
        }
        return done(null , user);
    });
}
));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser((user , done)=>{
    done(null , user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser((id , done)=>{
    User.findById(id , (err , user)=>{
        if(err){
            console.log('error in finding user --> passport/deserialize');
            return done(err);
        }
        console.log(user);
        return done(null , user);
    });
});


//check if the user is authenticated or not
passport.checkAuthentication = (req , res , next)=>{
    //if the user is signed in then call the next function
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = (req , res , next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
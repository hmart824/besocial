const express = require('express');
const port = 8000;
const app = express();
const cookieparser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieparser());
app.use(express.static('./statics'));
app.use(expressLayouts);

//extracts styles and scripts form sub pages into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//set up view engine and views
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({
    name: 'besocial',
    //TODO change the secret before deployment in production mode
    secret: "blahhhh",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//set up express router
app.use('/' , require('./routes'));

app.listen(port , (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})
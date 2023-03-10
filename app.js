const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const cookieparser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './statics/scss',
    dest: './statics/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieparser());
app.use(express.static(path.join(__dirname, 'statics')));
app.use(expressLayouts);


//extracts styles and scripts form sub pages into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//set up view engine and views
app.set('view engine' , 'ejs');
app.set('views' , './views');

//MongoStore is used to store the session cookie in db
app.use(session({
    name: 'besocial',
    //TODO change the secret before deployment in production mode
    secret: "blahhhh",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/besocial_development',
            MongooseConnection: db,
            autoRemove: 'disabled'
        },(err)=>{
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//set up express router
app.use('/' , require('./routes'));

app.listen(port , (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})
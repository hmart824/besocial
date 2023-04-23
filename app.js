const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const port = 8000;
const app = express();
require('./config/view-helpers')(app);
const path = require('path');
const cookieparser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

//* setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname , env.static_path , 'scss'),
        dest: path.join(__dirname , env.static_path , 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
// app.use(express.static(env.static_path));
app.use(express.static(path.join(__dirname , env.static_path)));

app.use(logger(env.morgan.mode , env.morgan.options))

//* make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);


//extracts styles and scripts form sub pages into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//set up view engine and views
app.set('view engine' , 'ejs');
app.set('views' , './views');
app.set('static path' , app.locals.staticPath);

//MongoStore is used to store the session cookie in db
app.use(session({
    name: 'besocial',
    //TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(customMiddleware.setFlash)

//set up express router
app.use('/' , require('./routes'));

app.listen(port , (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})
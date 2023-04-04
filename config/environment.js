const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname , '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log' , {
    interval: '1d',
    path: logDirectory
})

const development = {
    name: 'development',
    static_path: './statics',
    session_cookie_key: "blahhhh",
    db: 'besocial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'besocial824',
            pass: 'fkcpiwghdpnrujip'
        }
    },
    google_client_id: '328220384984-qikt0goofvm6fqed4d5g8leb2vkmscqa.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'besocial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    static_path: process.env.BESOCIAL_STATIC_PATH,
    session_cookie_key: process.env.BESOCIAL_SESSION_COOKIE_KEY,
    db: process.env.BESOCIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.BESOCIAL_GMAIL_USERNAME,
            pass: process.env.BESOCIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.BESOCIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.BESOCIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.BESOCIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.BESOCIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.BESOCIAL_ENVIRONMENT) == undefined ? development : eval(process.env.BESOCIAL_ENVIRONMENT);
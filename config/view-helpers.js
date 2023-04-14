const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app)=>{
    app.locals.staticPath = (filePath)=>{
        if(env.name == 'development'){
            return '/' + filePath;
        }
        if(filePath.match(/\.(jpg|jpeg|png|gif)$/i)){
            return '/' + JSON.parse(fs.readFileSync(path.join(__dirname , '../public/statics/images/rev-manifest.json')))[filePath];
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname , '../public/statics/rev-manifest.json')))[filePath];
    }
}
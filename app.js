const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

app.use(express.static('./statics'));
app.use(expressLayouts);

//extracts styles and scripts form sub pages into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);
//set up express router
app.use('/' , require('./routes'))

//set up view engine and views
app.set('view engine' , 'ejs')
app.set('views' , './views')


app.listen(port , (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})
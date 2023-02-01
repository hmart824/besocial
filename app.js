const express = require('express');
const port = 8000;
const app = express();

app.set('view engine' , 'ejs')
app.use('/' , require('./routes'))
app.listen(port , (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})
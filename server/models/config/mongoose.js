const mongoose = require('mongoose');
const env = require('./environment');

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://binayakumar824:JHHPmHP7bsvt594G@cluster0.dpegr6a.mongodb.net/${env.db}`);

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'error coonecting to dataabase!'));

db.once('open' , ()=>{
    console.log('connected to Database successfully!!!!!');
});

module.exports = db;
const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'error coonecting to dataabase!'));

db.once('open' , ()=>{
    console.log('connected to Database successfully!!!!!');
});

module.exports = db;
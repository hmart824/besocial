const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/besocial_development');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'error coonecting to dataabase!'));

db.once('open' , ()=>{
    console.log('connected to Database successfully!!!!!');
});

module.exports = db;
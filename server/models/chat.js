const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Chat = mongoose.model('Chat' , chatSchema);
module.exports = Chat;
const mongoose = require('mongoose');

const resetPasswordSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } ,
    accessToken: {
        type: String,
        required: true
    },
    is_valid: {
        type: Boolean,
        required: true
    }
} , {
    timestamps: true
});


const Resetpassword = mongoose.model('Resetpassword' , resetPasswordSchema);
module.exports = Resetpassword;


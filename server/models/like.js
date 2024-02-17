const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    //this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    //this field defines the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        require: true,
        enum: ['Post' , 'Comment']
    }
} , {
    timestamps: true
});

const Like = mongoose.model('Like' , likeSchema);
module.exports = Like;

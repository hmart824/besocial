const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async (req , res)=>{
   try{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        options: {
            sort: '-createdAt'
        },
        populate:{
            path: 'user'
        }
    })
    .populate('likes');
    
    let allUser = await User.find({});
    let user;
    if(req.user){
        user = await User.findById(req.user._id).populate('friends');
    }
           
        return res.render('home' , {
            title: "home",
            posts: posts,
            allUser: allUser,
            user: user
        })
    }catch(err){
     console.log(err);
     return;
    }
}

   
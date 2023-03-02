const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async (req , res)=>{
   try{
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    });
    
    let allUser = await User.find({});
           
        return res.render('home' , {
            title: "home",
            posts: posts,
            allUser: allUser
        })
    }catch(err){
     console.log(err);
     return;
    }
}

   
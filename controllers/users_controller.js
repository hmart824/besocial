const User = require('../models/user')
module.exports.profile = (req , res)=>{
    return res.render('profile' , {
        title: 'user_profile'
    })
}

module.exports.posts = (req , res)=>{
    return res.render('post' , {
        title: 'user_post'
    })
}

module.exports.signIn = (req , res)=>{
    return res.render('sign_in' , {
        title: 'BeSocial | sign in'
    })
}
module.exports.signUp = (req , res)=>{
    return res.render('sign_up' , {
        title: 'BeSocial | sign up'
    })
}


module.exports.create = (req , res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, (err , user)=>{
        if(err){
            console.log('error in finding the user in sign up');
            return 
        }
        if(!user){
            User.create(req.body , (err , user)=>{
                if(err){
                    console.log('error in finding the user in sign up');
                    return 
                }
                console.log("<--->" , user);
                return res.redirect('/users/sign-in')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}
module.exports.createSession = (req , res)=>{
    return res.redirect('/');
}

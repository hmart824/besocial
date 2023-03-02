const User = require('../models/user');

module.exports.profile = async (req , res)=>{
   try{
    let user = await User.findById(req.query.id);
    return res.render('profile' , {
        title: 'user_profile',
        profile_user: user
    })
   }catch(err){
    console.log(err);
    return;
   }
}
module.exports.update = async (req , res)=>{
    try{
        if(req.user.id === req.query.id){
            await User.findByIdAndUpdate(req.query.id , req.body);
            return res.redirect('back');
        }
        else{
            return res.status(401).send('unauthorized');
        }
    }catch(err){
        console.log(err);
        return;
    }
}



module.exports.signIn = (req , res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('sign_in' , {
        title: 'BeSocial | sign in'
    })
}
module.exports.signUp = (req , res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('sign_up' , {
        title: 'BeSocial | sign up'
    })
}


module.exports.create = async (req , res)=>{
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email})
            if(!user){
                await User.create(req.body);
                    return res.redirect('/users/sign-in')
            }
            else{
                return res.redirect('back');
            }
    }catch(err){
        console.log(err);
        return;
    }
}
module.exports.createSession = (req , res)=>{
    return res.redirect('/');
}
module.exports.destroySession = (req , res)=>{
    req.logout((err)=>{
        if(err){
            console.log('error in sign out');
            return;
        }
        return res.redirect('/');
    });
}

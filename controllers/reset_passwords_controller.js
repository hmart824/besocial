const User = require('../models/user');
const Resetpassword = require('../models/reset_password');
const crypto = require('crypto');
const queue = require('../config/kue');
const resetPasswordEmailWorker = require('../workers/reset_password_email_worker');




module.exports.resetPassword = (req , res)=>{
    return res.render('reset_password' , {
        title: 'BeSocial | reset password' ,
        accessToken: req.query.accessToken
    });
}

module.exports.getEmail = async(req , res)=>{
    console.log(req.body.email);
    try{
        let user = await User.findOne({email: req.body.email});
        let userToken = await Resetpassword.findOne({user: user.id});
        console.log('________>>',userToken);
        if(user && !userToken){
            let token = await Resetpassword.create({
                    user: user.id,
                    accessToken: crypto.randomBytes(20).toString('hex'),
                    is_valid: true
                });
                token = await token.populate('user' , ['name','email']);
                let job = queue.create('resetPasswordEmails' , token).save((err)=>{
                    if(err){
                        console.log('error in sendng the job to queue in getemail' , err);
                        return;
                    }else{
                        console.log('job enqueued' , job.id);
                    }
                })
                return res.redirect('back');            
        }else if(userToken){
            let cuurTime = new Date().getTime();
            let lastUpdatedTime = new Date(userToken.updatedAt).getTime();
            let hourDiff = (cuurTime - lastUpdatedTime) / 3600000;
            if(hourDiff > 24){
                await userToken.update({is_valid: true});
                let token = await userToken.populate('user' , ['name','email']);
                let job = queue.create('resetPasswordEmails' , token).save((err)=>{
                    if(err){
                        console.log('error in sendng the job to queue in getemail' , err);
                        return;
                    }else{
                        console.log('job enqueued' , job.id);
                    }
                })
                setTimeout(async ()=>{
                    await userToken.update({is_valid: false});
                }, 10*60*1000);
            }
                return res.redirect('back');    
        }else{
            console.log('You cannot change the password!');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error in reseting the password' , err);
        return res.redirect('back');
    }

}


module.exports.update = async (req , res)=>{
    try{
        let userToken = await Resetpassword.findOne({accessToken: req.params.accessToken});
        if(userToken && userToken.is_valid && req.body.new_password === req.body.confirm_new_password){
            console.log(userToken);
            await User.findByIdAndUpdate(userToken.user , {password: req.body.new_password});
            await userToken.update({
                                    is_valid: false , 
                                    accessToken: crypto.randomBytes(20).toString('hex')
                                });

        }else{
            console.log('The session has expired!!!!')
            return res.redirect('back');
        }
        return res.redirect('/users/sign-in');
    }catch(err){
        if(err){
            console.log('error in updating password' , err);
            return;
        }
    }

}
const nodemailer = require('../config/nodemailer');

exports.resetPassword = (token)=>{
    let htmlContent = nodemailer.renderTemplate(  {token: token} , '/reset_password/reset_password_mail.ejs')

    nodemailer.transporter.sendMail({
        from: 'besocial824@gmail.com',
        to: token.user.email,
        subject: 'Reset Password Link',
        html: htmlContent
    } , (err , info)=>{
        if(err){
            console.log('error in sending the email' , err);
            return;
        }

        console.log('Message sent' , info);
        return;
    })
}
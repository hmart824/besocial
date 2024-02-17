const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    let htmlContent = nodemailer.renderTemplate(  {comment: comment} , '/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from: 'besocial824@gmail.com',
        to: comment.user.email,
        subject: 'new comment published',
        html: htmlContent
    } , (err , info)=>{
        if(err){
            console.log('error in sending the email' , err);
            return;
        }

        // console.log('Message sent' , info);
        return;
    })
    

}
const queue = require('../config/kue');

const resetPasswordMailer = require('../mailers/reset_password_mailer');

queue.process('resetPasswordEmails' , (job , done)=>{
    console.log('resetpasswordEmail workers is processing a job' , job.data);
    resetPasswordMailer.resetPassword(job.data);

    done();

})
const nodemailer = require("nodemailer");

module.exports.sendEmail = (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOption, function(error, info){
        if(error){
            console.log(error)
        } else{
            console.log('Email sent: ' + info.response);
        }
    });
}
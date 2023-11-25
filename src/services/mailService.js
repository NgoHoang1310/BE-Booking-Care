const nodemailer = require("nodemailer");
require('dotenv').config();

let sendEmail = async (dataSend) => {

    if (!dataSend)
        return;
    const transporter = nodemailer.createTransport({
        // host: "smtp.forwardemail.net",
        service: 'gmail',
        port: 465,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_PASS
        }
    });

    let html = '';
    let subject = '';
    if (dataSend.language === 'en') {
        html = `<h2>Dear ${dataSend.name}!</h2>
                <p>You received this notification because you booked an appointment online on the site My Booking Care. You will have apoinment with: </p>
                <p><b>Doctor: ${dataSend.doctor} </b> </p>
                <p><b>Time: ${dataSend.time}</b> </p>
                 <p>If the above information is correct, please click on the link below to complete the medical examination procedure</p>
                 <a href='${dataSend.linkVerify}' >Click here</a>
                 <p>Thank you!</p>
                
        `;
        subject = 'Booking information';
    } else {
        html = `<h2>Xin chào ${dataSend.name}!</h2>
                <p>Bạn nhận được thông báo này vì đã đặt lịch hẹn online trên trang My Booking Care. Bạn sẽ có lịch hẹn khám bệnh với: </p>
                <p><b>Bác sĩ:${dataSend.doctor} </b> </p>
                <p><b>Thời gian:${dataSend.time}</b> </p>
                 <p>Nếu các thông tin trên là đúng, vui lòng ấn vào đường link bên dưới để hoàn thành thủ tục khám bệnh</p>
                 <a href='${dataSend.linkVerify}' >Click here</a>
                 <p>Xin chân thành cảm ơn!</p>
                
        `;
        subject = 'Thông tin đặt lịch khám bệnh';
    }
    const info = await transporter.sendMail({
        from: 'Booking Care Clone <ngotuanhoang1310@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: subject, // Subject line
        // text: "Hello world?", // plain text body
        html: html,
    });
}

let sendEmailRemery = async (dataSend) => {

    if (!dataSend)
        return;
    const transporter = nodemailer.createTransport({
        // host: "smtp.forwardemail.net",
        service: 'gmail',
        port: 465,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_PASS
        }
    });

    let html = '';
    let subject = '';
    if (dataSend.language === 'en') {
        html = `<h2>Dear ${dataSend.name}!</h2>
                <p>You received this message because you had a medical examination at Booking Care</p>
                <p>Prescription information is attached below</p>
                 <p>Thank you!</p>
                
        `;
        subject = 'Examination results';
    } else {
        html = `<h2>Xin chào ${dataSend.name}!</h2>
                <p>Bạn nhận được thông báo này vì đã khám bệnh tại Booking Care</p>
                <p>Thông tin về đơn thuốc được đính kèm dưới đây</p>
                 <p>Xin chân thành cảm ơn!</p>
                
        `;
        subject = 'Kết quả khám bệnh';
    }
    const info = await transporter.sendMail({
        from: 'Booking Care Clone <ngotuanhoang1310@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: subject, // Subject line
        // text: "Hello world?", // plain text body
        html: html,
        attachments: [
            {   // encoded string as an attachment
                filename: `${dataSend.name}.png`,
                content: dataSend.imageBase64.split("base64,")[1],
                encoding: 'base64'
            },

        ]
    });
}

module.exports = {
    sendEmail,
    sendEmailRemery
}
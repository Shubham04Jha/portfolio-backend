import nodemailer from "nodemailer";

// reference: https://www.geeksforgeeks.org/node-js/how-to-send-email-using-node-js/

export default async function main({email,message}:{email: string, message: string}){
    const recipient = process.env.RECIPIENT_EMAIL!;
    const sender = process.env.SENDER_EMAIL!;
    const password = process.env.NodeMailer_APP_Password!;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender, 
            pass: password,
        },
    });
    const mailOptions = {
        from: sender, 
        to: recipient, 
        subject: 'Update from portfolio website', 
        text: `${email} sent you the following message: \n \n${message}`,
    };
    return transporter.sendMail(mailOptions);
}
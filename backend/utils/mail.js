const nodemailer = require('nodemailer');


// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD // Use an App Password if 2FA is enabled
    }
});

async function sendEmail(from, to, subject, text) {

  const mailOptions = { from, to, subject, text };
  await transporter.sendMail(mailOptions);

}


module.exports = sendEmail
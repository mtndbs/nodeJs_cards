const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mytestdevforfun5555@gmail.com',
      pass: 'fbiwgchnwpiahioa'
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'mytestdevforfun5555@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
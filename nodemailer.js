const nodemailer = require('nodemailer'); 
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json"));
const express = require('express');
const app = express();

let text;
let userToSendEmail; 
let mailOptions;
let subject;
let transporter = nodemailer.createTransport(config);


app.get('/',(req,res)=>{
  var readStream = fs.createReadStream('./index.html');
  readStream.pipe(res);
});

app.get('/api/:userToSendEmail/:text/:subject',(req,res)=>{

  userToSendEmail=req.params.userToSendEmail;
  text=req.params.text;
  subject=req.params.subject;
  res.send(`${userToSendEmail} ${text} ${subject}`);

  mailOptions = {
    from: '',
    to: userToSendEmail,
    subject: subject,
    html: text
  };

 transporter.sendMail(mailOptions,(error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 

});

app.listen(3000,()=>{
  console.log("Listening on port 3000");
});


 
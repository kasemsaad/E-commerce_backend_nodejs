  
import nodemailer from "nodemailer";
import emailTemplate from "./emailTemplate.js";
export async function sendemail(option,url){
    // console.log(option)

 const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
service:"gmail",
//   port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "kasemsaad756@gmail.com",
    pass: "ghcs zwga nzuv zjpp",
  },
});
const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <kasemsaad756@gmail.com>', // sender address
    to: option, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemplate(option,url), // html body
  });
 
  console.log("Message sent: %s", info.messageId);


};
export async function resetpassword(option,url){
  // console.log(option)

const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
service:"gmail",
//   port: 465,
secure: true,
auth: {
  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
  user: "kasemsaad756@gmail.com",
  pass: "ghcs zwga nzuv zjpp",
},
});
const info = await transporter.sendMail({
  from: '"resetpassword" <kasemsaad756@gmail.com>', // sender address
  to: option, // list of receivers
  subject: "resetpassword", // Subject line
  text: "resetpassword", // plain text body
  html: emailTemplate(url), // html body
});

console.log("Message sent: %s", info.messageId);


};
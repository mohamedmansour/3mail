import nodemailer from 'nodemailer';

async function main() {
  let transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 25000,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "Foo", // generated ethereal user
      pass: "Bar", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "test@elmariachi.eth", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main();
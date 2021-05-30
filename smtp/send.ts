import nodemailer from 'nodemailer';

async function main(to:string , subject:string , content: string) {
  
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
    from: '"3mail smtp relay 👻" <foo@3mail.eth>', // sender address
    to, // list of receivers
    subject, // Subject line
    text: content, // plain text body
    html: content, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

const to = process.argv[2];
const subj = process.argv[3];
const content = process.argv[4];

main(to, subj, content);
const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

const sendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Kshitij Foo Koch 👻" <kshitijbarman1234@gmail.com>', // sender address
      to: "kshitijbarman1704@gmail.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

sendEmail();

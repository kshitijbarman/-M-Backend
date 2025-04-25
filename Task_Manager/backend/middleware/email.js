import { transporter } from "./email.config";

export const sendVerificationCode = async (email, VerificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Verify your Email ✔", // Subject line
      text: "Verify your Email", // plain text body
      html: VerificationCode, // html body
    });
    console.log("Email send successfully", response);
  } catch (error) {
    console.log(error);
  }
};

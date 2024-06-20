import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "116a686f243c88",
        pass: "9fbc1bdd8cbda3"
    }
});

export const sendPasswordResetEmail = (email: string, token: string) => {
    const url = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
        from: '"Communus" <noreply@comunus.com>',
        to: email,
        subject: "Password Reset",
        html: `Here your token: ${token}`,
    };

    return transporter.sendMail(mailOptions);
};
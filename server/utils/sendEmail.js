import nodemailer from "nodemailer"

export default async function sendEmail(email, subject, text) {
    try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			port: 465,
			secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
            tls: {
                rejectUnauthorized: true
            }
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});

		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);

		return error;
	}
}
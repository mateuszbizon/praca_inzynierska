const nodemailer = require("nodemailer");

async function sendEmail(email, link) {
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
				rejectUnauthorized: true,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: "Weryfikacja rejestracji",
			html: `<p>Dziękujemy za rejestrację w naszym systemie. Aby ukończyć rejestracje i korzystać z konta kliknij w link poniżej.</p></br></br>
			<a href="${link}" target="_blank">${link}</a>`,
		});

		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);

		return error;
	}
}

module.exports = sendEmail;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return res.status(404).json({success: false, message: "Błędne dane logowania" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect){
			return res.status(400).json({success: false, message: "Błędne dane logowania" });
        }

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "5h" }
		);

		res.status(200).json({success: true, result: existingUser, message: "logged", token: token });
	} catch (error) {
		res.status(500).json({ message: "Coś poszło nie tak" });
	}
};

export const signup = async (req, res) => {
	const { name, surname, email, username, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({success: false, message: "Email jest już zajęty" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${name} ${surname}`,
			username,
		});

		const token = jwt.sign({ email: result.email, id: result.id }, "test", {
			expiresIn: "1h",
		});

		res.status(200).json({success: true, result, token: token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};

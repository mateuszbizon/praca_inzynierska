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
	const selectedFile = '';

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({success: false, message: "Email jest już zajęty" });

		const existingUsername = await User.findOne({ username });

		if (existingUsername)
			return res.status(400).json({success: false, message: "Nazwa użytkownika jest już zajęta" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${name} ${surname}`,
			username,
			selectedFile,
		});

		const token = jwt.sign({ email: result.email, id: result.id }, "test", {
			expiresIn: "1h",
		});

		res.status(200).json({success: true, result, token: token });
	} catch (error) {
		res.status(500).json({ message: "Coś poszło nie tak" });
	}
};

export const getUser = async (req, res) => {
	const {username} = req.params;

	try {
		const user = await User.findOne({username: username});

		if(!user) return res.status(404).json({ message: "Nie znaleziono danego użytkonwika" });

		res.status(200).json({ username: user.username, name: user.name, file: user.selectedFile, siema: user.posts });
	} catch (error) {
		res.status(500).json({ message: "Coś poszło nie tak"})
	}
}

export const getUsersBySearch = async (req, res) => {
	const { search } = req.query;
	
	try {
		const username = new RegExp(search, "i");
		const name = new RegExp(search, "i");
		
		const users = await User.find({$or: [{username}, {name}]});
		
		res.json(users);
	} catch (error) {
		res.status(404).json({ message: "Użytkownik nie znaleziony" }) ;
	}
}

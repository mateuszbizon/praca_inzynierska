import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import PostMessage from '../models/postMessage.js';
import Token from "../models/token.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

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

		if (!existingUser.verified) {
			return res.status(400).json({ success: false, message: "Potwierdź rejestrację" })
		}

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "5h" }
		);

		res.status(200).json({success: true, result: existingUser, token: token });
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

		const user = await User.create({
			email,
			password: hashedPassword,
			name: `${name} ${surname}`,
			username,
			selectedFile,
		});

		const token = await Token.create({ userId: user._id, token: crypto.randomBytes(32).toString("hex") })

		const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;

		await sendEmail(user.email, "Weryfikacja rejestracji", url);

		res.status(200).json({ email: user.email, message: "Zarejestrowano pomyślnie" });
	} catch (error) {
		res.status(500).json({ message: "Coś poszło nie tak" });
	}
};

export const getUser = async (req, res) => {
	const {username} = req.params;

	try {
		const user = await User.findOne({username: username});

		if(!user) return res.status(404).json({ message: "Nie znaleziono danego użytkonwika" });

		const posts = await PostMessage.find({ username });

		res.status(200).json({ user: user, posts: posts.length });
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

export const editAccount = async (req, res) => {
	const { name, email, username, selectedFile } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if(existingUser){
			if(existingUser._id.toString() !== req.userId){
				return res.status(400).json({ message: "Email jest już zajęty" })
			}
		}

		const existingUsername = await User.findOne({ username });

		if(existingUsername){
			if(existingUsername._id.toString() !== req.userId){
				return res.status(400).json({ message: "Nazwa użytkownika jest już zajęta" })
			}
		}

		const user = await User.findById(req.userId);

		await PostMessage.updateMany({ username: {$eq: user.username} }, {$set: { username: username }});

		await PostMessage.updateMany({"comments.commentCreator": {$eq: user.username}}, {$set: {"comments.$[].commentCreator": username}})
		
		await User.findByIdAndUpdate(req.userId, { name: name, email: email, username: username, selectedFile: selectedFile }, { new: true })
		
		const newUser = await User.findById(req.userId);

		const token = jwt.sign(
			{ email: newUser.email, id: newUser._id },
			"test",
			{ expiresIn: "5h" }
		);

		res.status(200).json({success: true, result: newUser, token: token });
	} catch (error) {
		console.log(error)
	}
}

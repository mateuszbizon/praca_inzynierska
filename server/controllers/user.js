const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const PostMessage = require('../models/postMessage.js');
const Token = require("../models/token.js");
const crypto = require("crypto");
const { sendEmail, resetPasswordEmail } = require("../utils/sendEmail.js");
const commonMessages = require("../constants/commonMessages.js");
const userMessages = require("../constants/userMessages.js");
const passwordGenerator = require('generate-password');

 const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ message: userMessages.incorrectCredentials });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect){
			return res.status(400).json({ message: userMessages.incorrectCredentials });
        }

		if (!existingUser.verified) {
			return res.status(400).json({ message: userMessages.confirmRegistration })
		}

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "5h" }
		);

		res.status(200).json({ result: existingUser, token: token });
	} catch (error) {
		res.status(500).json({ message: commonMessages.serverError, desc: error.message });
	}
};

 const signup = async (req, res) => {
	const { name, surname, email, username, password } = req.body;
	const selectedFile = '';

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({ message: userMessages.emailAlreadyTaken });

		const existingUsername = await User.findOne({ username });

		if (existingUsername)
			return res.status(400).json({ message: userMessages.usernameAlreadyTaken });

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

		await sendEmail(user.email, url);

		res.status(200).json({ email: user.email, message: userMessages.registrationSuccess });
	} catch (error) {
		res.status(500).json({ message: commonMessages.serverError, desc: error.message });
	}
};

 const getUser = async (req, res) => {
	const {username} = req.params;

	try {
		const user = await User.findOne({username: username});

		if(!user) return res.status(404).json({ message: userMessages.userNotFound });

		res.status(200).json({ user: user });
	} catch (error) {
		res.status(500).json({ message: commonMessages.serverError, desc: error.message });
	}
}

 const getUsersBySearch = async (req, res) => {
	const { search } = req.query;
	
	try {
		const username = new RegExp(search, "i");
		const name = new RegExp(search, "i");
		
		const users = await User.find({$or: [{username}, {name}]});
		
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: commonMessages.serverError, desc: error.message });
	}
}

 const editAccount = async (req, res) => {
	const { name, username, selectedFile } = req.body;

	try {
		const existingUsername = await User.findOne({ username });

		if(existingUsername){
			if(existingUsername._id.toString() !== req.userId){
				return res.status(400).json({ message: userMessages.usernameAlreadyTaken })
			}
		}

		const user = await User.findById(req.userId);

		await PostMessage.updateMany({ username: {$eq: user.username} }, {$set: { username: username }});

		await PostMessage.updateMany({"comments.commentCreator": {$eq: user.username}}, {$set: {"comments.$[].commentCreator": username}})
		
		await User.findByIdAndUpdate(req.userId, { name: name, username: username, selectedFile: selectedFile }, { new: true })
		
		const newUser = await User.findById(req.userId);

		const token = jwt.sign(
			{ email: newUser.email, id: newUser._id },
			"test",
			{ expiresIn: "5h" }
		);

		res.status(200).json({ message: userMessages.updatedSuccess, result: newUser, token: token });
	} catch (error) {
		res.status(500).json({ message: commonMessages.serverError, desc: error.message });
	}
}

 const editPassword = async (req, res) => {
	const { id } = req.params;
	const { password, newPassword } = req.body
	
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: userMessages.userNotFound });

		const user = await User.findById(id)

		if (user && id !== req.userId) {
			res.status(400).json({ message: userMessages.cantChangePasswordOtherUser })
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			user.password
		);

		if (!isPasswordCorrect) return res.status(400).json({ message: userMessages.incorrectPassword })

		const newHashedPassword = await bcrypt.hash(newPassword, 12);

		user.password = newHashedPassword

		await User.findByIdAndUpdate(id, user, { new: true })

		res.status(200).json({ message: userMessages.passwordChangedSuccess })
	} catch (error) {
		res.status(500).json({ message: commonMessages.serverError, desc: error.message });
	}
}

const resetPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const existingUser = await User.findOne({ email: email })

		if (!existingUser) {
			return res.status(404).json({ message: userMessages.emailNotFound });
		}

		const newPassword = passwordGenerator.generate({
			length: 15,
			numbers: true,
			symbols: true
		});

		console.log(newPassword);

		const hashedPassword = await bcrypt.hash(newPassword, 12);

		existingUser.password = hashedPassword;

		await User.findByIdAndUpdate(existingUser._id, existingUser, { new: true });

		await resetPasswordEmail(existingUser.email, newPassword);

		res.status(200).json({ message: userMessages.passwordResetedSuccess })
	} catch (error) {
		res.status(500).json({ message: commonMessages.serverError, desc: error.message });
	}
}

module.exports = { signin, signup, editAccount, editPassword, getUser, getUsersBySearch, resetPassword }
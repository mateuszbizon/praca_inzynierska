import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import timesRoutes from './routes/times.js';
import sessionsRoutes from './routes/sessions.js';
import tutorialsRoutes from "./routes/tutorials.js";
import contestsRoutes from "./routes/contests.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "1gb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/times", timesRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/tutorials", tutorialsRoutes);
app.use("/contests", contestsRoutes);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
	)
	.catch(error => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);

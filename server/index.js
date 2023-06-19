import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import getBestTime from "./utils/getBestTime.js";
import deleteWorstAndBestTime from "./utils/deleteWorstAndBestTime.js";
import getAverage from "./utils/getAverage.js";
import { sortArrayByAverage } from "./utils/sortArrays.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import timesRoutes from "./routes/times.js";
import sessionsRoutes from "./routes/sessions.js";
import tutorialsRoutes from "./routes/tutorials.js";
import contestsRoutes from "./routes/contests.js";
import verifyEmailsRoutes from "./routes/verifyEmails.js";

const app = express();
dotenv.config();

const server = http.createServer(app);

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.1.0',
		info: {
			title: "Social Speed Cubing API",
			version: "1.0.0",
		},
		components: {
			securitySchemes: {
				Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
			},
		},
		security: [{
			Authorization: []
		}]
	},

	apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(bodyParser.json({ limit: "1gb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/times", timesRoutes);
app.use("/sessions", sessionsRoutes);
app.use("/tutorials", tutorialsRoutes);
app.use("/contests", contestsRoutes);
app.use("/emails", verifyEmailsRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", socket => {
	socket.on("join_room", data => {
		socket.join(data.room);
	});

	socket.on("send_time", data => {
		const currentUser = data.users.find(u => u.email === data.email);

		const bestTime = getBestTime(data.times);

		const arrayAverage = deleteWorstAndBestTime(data.times, bestTime);

		const average = getAverage(arrayAverage);

		const currentUserIndex = data.users.indexOf(currentUser);

		data.users[currentUserIndex] = {
			...currentUser,
			times: data.times,
			average: average.average,
			averageText: average.averageText,
			bestTime: bestTime,
		};

		sortArrayByAverage(data.users);

		socket.to(data.room).emit("get_times", data.users);
	});
});

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
	)
	.catch(error => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);

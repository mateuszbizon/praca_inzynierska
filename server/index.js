const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const getBestTime = require("./utils/getBestTime.js");
const deleteWorstAndBestTime = require("./utils/deleteWorstAndBestTime.js");
const getAverage = require("./utils/getAverage.js");
const { sortArrayByAverage } = require("./utils/sortArrays.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const timesRoutes = require("./routes/times.js");
const sessionsRoutes = require("./routes/sessions.js");
const tutorialsRoutes = require("./routes/tutorials.js");
const contestsRoutes = require("./routes/contests.js");
const verifyEmailsRoutes = require("./routes/verifyEmails.js");

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
		origin: "https://social-speed-cubing.netlify.app/",
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

module.exports = app;
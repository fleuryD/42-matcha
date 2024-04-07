var express = require("express")
var createError = require("http-errors")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var http = require("http")
const { Server } = require("socket.io")
var debug = require("debug")("back2:server")

const { BACK_PORT, FRONT_BASE_URL } = require("./data/constants")

var indexRouter = require("./routes/index.routes")
var authRouter = require("./routes/auth.routes")
var tagsRouter = require("./routes/tags.routes")
var usersRouter = require("./routes/users.routes")
var adminRouter = require("./routes/admin.routes")
var relationsRouter = require("./routes/relations.routes") // * router for like, block and fake
var imagesRouter = require("./routes/images.routes")

const { logServerStarts } = require("./helpers/logs.helper")

const { setOnlineByAccessToken, setOfflineByAccessToken } = require("./repositories/users.repository")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const app = express()

var port = BACK_PORT
app.set("port", port)
//app.set("trust proxy", true) // To get IP ?????????????????????????????????????
//app.set("trust proxy", "loopback, 172.19.0.1")
//app.enable("trust proxy")
app.set("trust proxy", true)

/*
app.set("trust proxy", function (ip) {
	if (ip === "127.0.0.1" || ip === "123.123.123.123")
		return true // trusted IPs
	else return false
})
*/

// 91.151.126.61
var server = http.createServer(app)


server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

// **********************	ioServer

app.io = new Server(server, {
	cors: {
		origin: FRONT_BASE_URL,
		methods: ["GET", "POST"],
	},
})

app.io.on("connection", function (socket) {
	const userAccessToken = socket?.handshake?.headers?.authorization || null
	console.log("⚪⚪⚪ socket..userAccessToken", userAccessToken)

	console.log("⏩ 🟢 A user connected")
	setOnlineByAccessToken(userAccessToken)
	socket.emit("subscribeToTest", { message: "a new client connected" })

	//Whenever someone disconnects this piece of code executed
	socket.on("disconnect", function () {
		console.log("⏩ 🔴 A user disconnected")
		//console.log("socket", socket)
		setOfflineByAccessToken(userAccessToken)
	})
	socket.on("socketsendtest", function () {
		console.log("⏩ ⏩ A user socketSendTest")
	})
})

app.io.on("socketsendtest", function (socket) {
	socket.on("socketsendtest", function () {
		console.log("⏩ ⏩ A user socketSendTest bjhvjhv")
	})
	console.log("⏩ ⏩ A user socketSendTestsocketSendTestsocketSendTestsocketSendTest")
})

// **********************	view engine setup

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

// **********************

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// **********************	ROUTERS

app.use("/", indexRouter)
app.use("/auth", authRouter)
app.use("/tags", tagsRouter)
app.use("/users", usersRouter)
app.use("/admin", adminRouter)
app.use("/relations", relationsRouter)
app.use("/images", imagesRouter)

// **********************

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

// PRIVATE	 ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

/*
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
	var port = parseInt(val, 10)
	if (isNaN(port)) {
		// named pipe
		return val
	}
	if (port >= 0) {
		// port number
		return port
	}
	return falseserver
}

/*
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	console.log("📛 ErRoR: ", error)
	if (error.syscall !== "listen") {
		throw error
	}
	var bind = typeof port === "string" ? "Pipe " + port : "Port " + port
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges")
			process.exit(1)
			break
		case "EADDRINUSE":
			console.error(bind + " is already in use")
			process.exit(1)
			break
		default:
			throw error
	}
}

/*
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	var addr = server.address()
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
	debug("Listening on " + bind)
	logServerStarts()
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
module.exports = app

require("dotenv").config()

// ################		PROD/DEV		################

const APP_MODE = process.env.APP_MODE === "DEV" ? "DEV" : "PROD"
//const APP_MODE = "PROD" // !!!!!!!!!!!!!!!!!!!!!!!!

const DEV_SUPER_PASSWORD = process.env.DEV_SUPER_PASSWORD || null
const DEV_SEND_EMAIL_TOKEN_AFTER_REGISTRATION = true // * prod : false

// ################		XXX		################

const BACK_PORT = normalizePort(process.env.BACK_PORT || "0")
const FRONT_BASE_URL = process.env.FRONT_BASE_URL || null

// ################		POOL - DB CONNEXION 	################

const POOL_USER = process.env.POOL_USER || null
const POOL_HOST = process.env.POOL_HOST || null
const POOL_DATABASE = process.env.POOL_DATABASE || null
const POOL_PASSWORD = process.env.POOL_PASSWORD || null
const POOL_PORT = normalizePort(process.env.POOL_PORT || "0")

// ################		SEND EMAIL	 ################

const MAIL_HOST = process.env.MAIL_HOST || null
const MAIL_EMAIL = process.env.MAIL_EMAIL || null
const MAIL_USERNAME = process.env.MAIL_USERNAME || null
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || null
const MAIL_PORT = normalizePort(process.env.MAIL_PORT || "0")

// ################		JWT		################

const JWT_SECRET = process.env.JWT_SECRET || null

// ################		XXX		################
// ################		XXX		################
// ################		XXX		################
// ################		XXX		################

const ERROR_INVALID_USERNAME_FORMAT = "INVALID_USERNAME_FORMAT"
const ERROR_INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT"

const ERROR_USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS"
const ERROR_EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"

const ERROR_EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND"
const ERROR_USER_NOT_FOUND = "USER_NOT_FOUND"

const COEF_LIKED = 10
const COEF_VISITED = 2
const COEF_BLOCKED = -5
const COEF_FAKED = -42

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ Private

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

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	APP_MODE,

	BACK_PORT,
	FRONT_BASE_URL,

	POOL_USER,
	POOL_HOST,
	POOL_DATABASE,
	POOL_PASSWORD,
	POOL_PORT,

	MAIL_HOST,
	MAIL_EMAIL,
	MAIL_USERNAME,
	MAIL_PASSWORD,
	MAIL_PORT,

	JWT_SECRET,

	DEV_SEND_EMAIL_TOKEN_AFTER_REGISTRATION,
	DEV_SUPER_PASSWORD,

	ERROR_INVALID_USERNAME_FORMAT,
	ERROR_INVALID_EMAIL_FORMAT,

	ERROR_USERNAME_ALREADY_EXISTS,
	ERROR_EMAIL_ALREADY_EXISTS,

	ERROR_EMAIL_NOT_FOUND,
	ERROR_USER_NOT_FOUND,

	COEF_LIKED,
	COEF_VISITED,
	COEF_BLOCKED,
	COEF_FAKED,
}

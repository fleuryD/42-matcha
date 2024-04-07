// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")

const sReset = "\x1b[m"
const cGra = "\x1b[30m"
const cRed = "\x1b[31m"
const cGre = "\x1b[32m"
const cYel = "\x1b[33m"
const cBlu = "\x1b[34m"
const cMag = "\x1b[35m"
const cCya = "\x1b[36m"
const cWhi = "\x1b[37m"

const bGra = "\x1b[40m"
const bRed = "\x1b[41m"
const bGre = "\x1b[42m"
const bYel = "\x1b[43m"
const bBlu = "\x1b[44m"
const bMAG = "\x1b[45m"
const bCya = "\x1b[46m"
const bWhi = "\x1b[47m"

const sBold = "\x1b[1m"
const sUnder = "\x1b[4m"
const sRev = "\x1b[7m"

const {
	APP_MODE,

	DEV_SUPER_PASSWORD,
	DEV_SEND_EMAIL_TOKEN_AFTER_REGISTRATION,

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
} = require("../data/constants")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘	PRIVATE		◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

function checkEnv(name, value) {
	if (!value || value === 0)
		console.log(bRed + cWhi + ".ENV ERROR: " + sReset + cRed + " env." + name + " Missing ! " + sReset)
	else console.log(" env." + name + ": " + cGre + "OK" + sReset)
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

function logServerStarts() {
	console.log(`\n\n${cGre}◘◘◘◘◘◘◘◘◘◘◘◘ SERVER RUNNING ◘◘◘◘◘◘◘◘◘◘◘◘\n\n`)

	console.log(`\t APP_MODE: "${APP_MODE}"\n`)
	console.log(`\t DEV_SUPER_PASSWORD: "${DEV_SUPER_PASSWORD}"\n`)

	console.log(`\n\n`)

	checkEnv("APP_MODE", APP_MODE)

	if (APP_MODE !== "DEV" && APP_MODE !== "PROD")
		console.log(bRed + cWhi + ".ENV ERROR: " + sReset + cRed + " env.APP_MODE should be DEV | PROD  " + sReset)

	checkEnv("DEV_SUPER_PASSWORD", DEV_SUPER_PASSWORD)
	checkEnv("DEV_SEND_EMAIL_TOKEN_AFTER_REGISTRATION", DEV_SEND_EMAIL_TOKEN_AFTER_REGISTRATION)

	checkEnv("BACK_PORT", BACK_PORT)
	checkEnv("FRONT_BASE_URL", FRONT_BASE_URL)

	checkEnv("POOL_USER", POOL_USER)
	checkEnv("POOL_HOST", POOL_HOST)
	checkEnv("POOL_DATABASE", POOL_DATABASE)
	checkEnv("POOL_PASSWORD", POOL_PASSWORD)
	checkEnv("POOL_PORT", POOL_PORT)

	checkEnv("MAIL_HOST", MAIL_HOST)
	checkEnv("MAIL_EMAIL", MAIL_EMAIL)
	checkEnv("MAIL_USERNAME", MAIL_USERNAME)
	checkEnv("MAIL_PASSWORD", MAIL_PASSWORD)
	checkEnv("MAIL_PORT", MAIL_PORT)

	checkEnv("JWT_SECRET", JWT_SECRET)

	console.log(`\n\n${cGre}◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘\n\n`)
}

function logRoute(res, methode, path) {
	const connectedUser = res?.locals?.connectedUser || null

	console.log(
		"🚙 " +
			cCya +
			(connectedUser?.username ? "[" + connectedUser?.username + "] " : "") +
			sRev +
			" " +
			methode +
			" :: " +
			path +
			" " +
			sReset
	)
}

function logError(functionName, errorMsg) {
	console.log("❌ " + cRed + sRev + " " + functionName + " " + sReset + " " + cRed + errorMsg + sReset)
}

function logDebug(v1, v2 = null) {
	if (v2) console.log("🟡 " + cYel + " " + v1 + sReset, v2)
	else console.log("🟡 " + cYel + " " + v1 + sReset)
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	logServerStarts,
	logRoute,
	logError,
	logDebug,
}

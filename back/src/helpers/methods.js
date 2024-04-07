// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

let jwt = require("jsonwebtoken")
const { logRoute, logDebug, logError } = require("../helpers/logs.helper")
const { APP_MODE } = require("../data/constants")

// *** ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const {
	ERROR_INVALID_USERNAME_FORMAT,
	ERROR_EMAIL_NOT_FOUND,
	ERROR_EMAIL_ALREADY_EXISTS,
	ERROR_INVALID_EMAIL_FORMAT,
	JWT_SECRET,
	DEV_SUPER_PASSWORD,
} = require("../data/constants")

const { findUserOrNullBy } = require("../repositories/users.find.repository")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function ensureAccessToken(req, res, next) {
	var bearerHeader = req.headers["authorization"]

	try {
		if (typeof bearerHeader === "undefined") {
			return res.sendStatus(403)
		}

		const bearer = bearerHeader.split(" ")
		const bearerToken = bearer[1]

		let userId = 0

		jwt.verify(bearerToken, JWT_SECRET, (err, result) => {
			if (err) {
				//res.sendStatus(403)
				logError("🔑 ensureAccessToken ❌", "INVALID_TOKEN")
				return res.json({ error: "INVALID_TOKEN" })
			}
			userId = result.id
		})

		const user = await findUserOrNullBy(
			"id",
			userId,
			(selectList = " u.id, u.username, u.email, u.email_token, u.latitude, u.longitude, u.picture_1 ")
		)
		if (!user) {
			logError("🔑 ensureAccessToken ❌", "INVALID_TOKEN")
			return res.json({ error: "INVALID_TOKEN" })
		}
		if (user.email_token) {
			logError("🔑 ensureAccessToken ❌", "EMAIL_NOT_CONFIRMED")
			return res.json({ error: "EMAIL_NOT_CONFIRMED" })
		}

		res.locals.connectedUser = {
			id: user.id,
			username: user.username,
			email: user.email,
			latitude: user.latitude,
			longitude: user.longitude,
			picture_1: user.picture_1,
		}

		logDebug("🔑 ensureAccessToken ✅️ :", res.locals.connectedUser.username)

		next()
	} catch (e) {
		console.error("ensureAccessToken: ERROR: ", e)
		next(e)
	}
}

async function ensureSuperPassword(req, res, next) {
	try {
		if (APP_MODE !== "DEV") {
			logError("🔒 ensureSuperPassword ❌", "SUPER_PASSWORD_MISSING")
			return res.json({ error: "CANT_USE_SUPER_PASSWORD_IN_PROD" })
		}

		const superPassword = req?.body?.superPassword || null

		if (!superPassword) {
			logError("🔒 ensureSuperPassword ❌", "SUPER_PASSWORD_MISSING")
			return res.json({ error: "SUPER_PASSWORD_MISSING" })
		}

		if (superPassword !== DEV_SUPER_PASSWORD) {
			logError("🔒 ensureSuperPassword ❌", "INVALID_SUPER_PASSWORD")
			return res.json({ error: "INVALID_SUPER_PASSWORD" })
		}

		logDebug("🔒 ensureSuperPassword ✅️")
		next()
	} catch (e) {
		logError("🔒 ensureSuperPassword ❌", e)
		next(e)
	}
}

async function ensureAccessTokenOrSuperPassword(req, res, next) {
	try {
		const superPassword = req?.body?.superPassword || null

		if (superPassword) {
			ensureSuperPassword(req, res, next)
		} else {
			ensureAccessToken(req, res, next)
		}

		logDebug("🔒 ensureAccessTokenOrSuperPassword ✅️")
	} catch (e) {
		logError("🔒 ensureAccessTokenOrSuperPassword ❌", e)
		next(e)
	}
}

module.exports = {
	ensureAccessToken,
	ensureSuperPassword,
	ensureAccessTokenOrSuperPassword,
}

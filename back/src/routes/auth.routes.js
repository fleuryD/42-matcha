// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const express = require("express")
const router = express.Router()
const cors = require("cors")

const { logRoute, logDebug, logError } = require("../helpers/logs.helper")
const methods = require("../helpers/methods")

const {
	registerService,
	checkMailService,
	loginService,
	quickLoginService,
	passwordResetAskingService,
	passwordResetUpdateService,
} = require("../services/auth.service")

const { DEV_SEND_EMAIL_TOKEN_AFTER_REGISTRATION } = require("../data/constants")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

router.use(cors({ allowedOrigins: ["*"] }))

// * REGISTER ******************************************************************

router.post("/register", async function (req, res, next) {
	logRoute(res, "POST", "/auth/register")

	const newUser = req.body
	try {
		const { emailToken } = await registerService(newUser)
		res.json({
			success: 1,
			emailToken: DEV_SEND_EMAIL_TOKEN_AFTER_REGISTRATION ? emailToken : null,
		})
	} catch (e) {
		console.log("⭕ /register Error:", e)
		return res.json({ error: e.message })
	}
})

/*
 *	CHECK EMAIL_TOKEN
 *
 *	1) find User by email_token
 *	2) set email_token to null
 *	3) return success
 *
 */
router.post("/check-email", async function (req, res, next) {
	logRoute(null, "POST", "/auth/check-email")
	const emailToken = req.body.emailToken

	try {
		await checkMailService(emailToken)
		res.json({
			success: 1,
		})
	} catch (e) {
		console.log("⭕ /check-email:", e.message)
		return res.json({ error: e.message })
	}
})

// * LOGIN / QUICK-LOGIN********************************************************

router.post("/login", async function (req, res, next) {
	logRoute(null, "POST", "/auth/login")

	const emailOrUsername = req.body.emailOrUsername
	const plainPassword = req.body.password

	try {
		const user = await loginService({ emailOrUsername, plainPassword })
		return res.json({ user: user })
	} catch (e) {
		console.log("⭕ /login Error:", e.message)
		return res.json({ error: e.message })
	}
})

/*
 *
 *
 */
router.post("/dev/quick-login", methods.ensureSuperPassword, async function (req, res, next) {
	logRoute(null, "POST", "/auth/dev/quick-login")

	const emailOrUsername = req.body.emailOrUsername
	const superPassword = req.body.superPassword

	try {
		const user = await quickLoginService({ emailOrUsername, superPassword })
		return res.json({ user: user })
	} catch (e) {
		console.log("⭕ /auth/dev/quick-login Error:", e.message)
		return res.json({ error: e.message })
	}
})

// * PASSWORD RESET : ASK / UPDATE *********************************************

router.post("/password/reset/ask", async function (req, res, next) {
	logRoute(null, "POST", "/auth/password/reset/ask")

	const email = req.body.email

	try {
		let passwordResetToken = await passwordResetAskingService({ email })
		res.json({
			success: 1,
			passwordResetToken, // DEBUG ONLY
		})
	} catch (e) {
		console.log("⭕ /register Error:", e)
		return res.json({ error: e.message })
	}
})

router.post("/password/reset/update", async function (req, res, next) {
	logRoute(null, "POST", "/auth/password/reset/update")

	const { email, password, passwordResetToken } = req.body
	try {
		await passwordResetUpdateService({ email, password, passwordResetToken })
		res.json({ success: 1 })
	} catch (e) {
		console.log("⭕ /register Error:", e)
		return res.json({ error: e.message })
	}
})

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = router

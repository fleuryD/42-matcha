// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
var express = require("express")
var router = express.Router()
var cors = require("cors")

var methods = require("../helpers/methods")
const { logRoute, logDebug, logError } = require("../helpers/logs.helper")

const {
	likeUserOrFail,
	unlikeUserOrFail,
	fakeUserOrFail,
	unfakeUserOrFail,
	blockUserOrFail,
	unblockUserOrFail,
} = require("../services/relations.service")
const { createAndSendNotificationService } = require("../services/notifications.service")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

router.use(cors({ allowedOrigins: ["*"] }))

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

router.get("/like-user/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "GET", "/like-user/:id")

	try {
		const senderId = res.locals.connectedUser.id
		const targetId = req.params.id

		const like = await likeUserOrFail({ senderId, targetId })

		createAndSendNotificationService({
			targetId: targetId,
			senderId: senderId,
			senderUsername: res.locals.connectedUser.username,
			senderPicture1: res.locals.connectedUser.picture_1,
			genre: "LIKE",
			io: req.app.io,
		})

		res.json({ like })
	} catch (e) {
		logError("/like-user Error:", e.message)
		return res.json({ error: e.message })
	}
})

router.get("/block-user/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "POST", "/block-user/:id")

	try {
		const senderId = res.locals.connectedUser.id
		const targetId = req.params.id

		const block = await blockUserOrFail({ senderId, targetId })

		res.json({ block: block })
	} catch (e) {
		logError("/block-user Error:", e.message)
		return res.json({ error: e.message })
	}
})

router.get("/fake-user/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "GET", "/fake-user/:id")

	try {
		const senderId = res.locals.connectedUser.id
		const targetId = req.params.id

		const fake = await fakeUserOrFail({ senderId, targetId })

		res.json({ fake })
	} catch (e) {
		logError("/fake-user Error:", e.message)
		return res.json({ error: e.message })
	}
})

// *****************************************************************************

router.get("/unlike-user/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "GET", "/unlike-user/:id")

	try {
		const senderId = res.locals.connectedUser.id
		const targetId = req.params.id

		await unlikeUserOrFail({ senderId, targetId })

		createAndSendNotificationService({
			targetId: targetId,
			senderId: senderId,
			senderUsername: res.locals.connectedUser.username,
			senderPicture1: res.locals.connectedUser.picture_1,
			genre: "UNLIKE",
			io: req.app.io,
		})

		res.json({ success: 1 })
	} catch (e) {
		logError("/unlike-user Error:", e.message)
		return res.json({ error: e.message })
	}
})

router.get("/unblock-user/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "POST", "/unblock-user/:id")

	try {
		const senderId = res.locals.connectedUser.id
		const targetId = req.params.id

		await unblockUserOrFail({ senderId, targetId })

		res.json({ success: 1 })
	} catch (e) {
		logError("/unblock-user Error:", e.message)
		return res.json({ error: e.message })
	}
})

router.get("/unfake-user/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "GET", "/unfake-user/:id")

	try {
		const senderId = res.locals.connectedUser.id
		const targetId = req.params.id

		await unfakeUserOrFail({ senderId, targetId })

		res.json({ success: 1 })
	} catch (e) {
		logError("/unfake-user Error:", e.message)
		return res.json({ error: e.message })
	}
})

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = router

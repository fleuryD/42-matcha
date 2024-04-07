// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
var express = require("express")
var router = express.Router()
var cors = require("cors")

const db = require("../data/pg")
const jwt = require("jsonwebtoken")

const { logRoute, logDebug, logError } = require("../helpers/logs.helper")

var methods = require("../helpers/methods")

const { createMessage } = require("../repositories/messages.repository")
const { areUsersMatching, areUsersBlocking } = require("../repositories/relations.repository")

const { createAndSendNotificationService } = require("../services/notifications.service")
const { deleteNotificationsByTargetId } = require("../repositories/notifications.repository")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

router.use(cors({ allowedOrigins: ["*"] }))

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

/*
 *
 *
 *
 */
router.post("/chat/send-message", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "POST", "/chat/send-message")
	const { targetId, content } = req.body
	const connectedUser = res.locals.connectedUser

	try {
		if (!(await areUsersMatching(connectedUser.id, targetId))) throw new Error("CANT_CHAT_IF_NOT_MATCHING")
		if (await areUsersBlocking(connectedUser.id, targetId)) throw new Error("CANT_CHAT_IF_BLOCKING")

		let message = await createMessage({ senderId: connectedUser.id, targetId, content })

		createAndSendNotificationService({
			targetId: targetId,
			senderId: connectedUser.id,
			senderUsername: res.locals.connectedUser.username,
			senderPicture1: res.locals.connectedUser.picture_1,
			genre: "MESSAGE",
			message,
			io: req.app.io,
		})

		res.json({
			message: message,
		})
	} catch (e) {
		logError("⭕ /chat/send-message Error:", e.message)
		return res.json({ error: e.message })
	}
})

/*
 *
 *
 *
 */
router.get("/notifications/mark-all-as-read", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "get", "/notifications/mark-all-as-read")

	const connectedUserId = res.locals.connectedUser.id

	try {
		await deleteNotificationsByTargetId({ targetId: connectedUserId })
		res.json({
			success: 1,
		})
	} catch (e) {
		logError("⭕ /notifications/mark-all-as-read Error:", e.message)
		return res.json({ error: e.message })
	}
})

/*
 *
 *
 *
 */
/* GET home page. */
router.get("/", methods.ensureAccessToken, function (req, res, next) {
	logRoute(res, "GET", "/")
	res.render("index", { title: "Matcha's Express Backend" })
})

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = router

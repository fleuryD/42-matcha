// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
var express = require("express")
var router = express.Router()
var cors = require("cors")
var methods = require("../helpers/methods")
const db = require("../data/pg")
const jwt = require("jsonwebtoken")
const { getAllTags, getTagsOfUser, removeTagFromUser } = require("../repositories/tags.repository")

const { logRoute, logDebug, logError } = require("../helpers/logs.helper")
const { addTagToUserOrFail, removeTagFromUserOrFail } = require("../services/tags.service")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

router.use(cors({ allowedOrigins: ["*"] }))

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

router.get("/", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "GET", "/tags")
	//const resultTags = await db.query("select * from tags")
	//const tags = resultTags.rows
	const tags = await getAllTags()
	res.json({ tags: tags })
})

/*
 *	Ce n'est PAS pour creer un nouveau tag mais pour ajouter un tag a un user
 *
 *
 */
router.get("/add/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "GET", "/tags/add/" + req.params.id)

	try {
		const tagId = req.params.id
		const connectedUserId = res.locals.connectedUser.id

		await addTagToUserOrFail({ tagId, userId: connectedUserId })
		const myTags = await getTagsOfUser(connectedUserId)
		res.json({ myTags: myTags })
	} catch (e) {
		logError("/tags/add Error:", e.message)
		return res.json({ error: e.message })
	}
})

/*
 *	Ce n'est PAS pour supprimer un tag mais pour retirer un tag a un user
 *
 *
 */
router.get("/remove/:id", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "GET", "/tags/remove/" + req.params.id)

	try {
		const tagId = req.params.id
		const connectedUserId = res.locals.connectedUser.id

		await removeTagFromUserOrFail({ tagId, userId: connectedUserId })
		const myTags = await getTagsOfUser(connectedUserId)
		res.json({ myTags: myTags })
	} catch (e) {
		logError("/tags/remove Error:", e.message)
		return res.json({ error: e.message })
	}
})

module.exports = router

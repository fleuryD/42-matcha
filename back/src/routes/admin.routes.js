// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
var express = require("express")
var router = express.Router()
var cors = require("cors")

const { logRoute, logDebug, logError } = require("../helpers/logs.helper")
var methods = require("../helpers/methods")

const {
	fixtureDeleteAllFromAllTablesService,
	fixtureCreateUsersService,
	fixtureCreateRelationsService,
} = require("../services/fixtures.service")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

router.use(cors({ allowedOrigins: ["*"] }))

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

//  DEBUG ONLY

/*
 *
 */
router.post("/fixtures/delete-all-from-all-tables", methods.ensureSuperPassword, async function (req, res, next) {
	logRoute(null, "POST", "/fixtures/delete-all-from-all-tables")
	try {
		await fixtureDeleteAllFromAllTablesService()
		res.json({ success: 1 })
	} catch (e) {
		console.log("⭕ /fixtures/delete-all-from-all-tables:: Error:", e.message)
		return res.json({ error: e.message })
	}
})

/*
 *
 */
router.post("/fixtures/create-users", methods.ensureSuperPassword, async function (req, res, next) {
	logRoute(null, "POST", "/fixtures/create-users")

	try {
		await fixtureCreateUsersService()
		res.json({
			success: 1,
		})
	} catch (e) {
		console.log("⭕ /fixtures/create-users:: Error:", e.message)
		return res.json({ error: e.message })
	}
})

/*
 *
 */
router.post("/fixtures/relations", methods.ensureSuperPassword, async function (req, res, next) {
	logRoute(null, "POST", "/fixtures/relations")

	try {
		await fixtureCreateRelationsService()
		res.json({
			success: 1,
		})
	} catch (e) {
		console.log("⭕ /fixtures/relations Error:", e.message)
		return res.json({ error: e.message })
	}
})

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = router

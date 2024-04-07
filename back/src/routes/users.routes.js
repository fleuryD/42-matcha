/**
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 **■                                                                           ■
 **■                                                        :::      ::::::::  ■
 **■                                                       :+:      :+:    :+: ■
 **■                     | |       | |                  +:+ +:+         +:+    ■
 **■    _ __ ___    __ _ | |_  ___ | |__    __ _      +#+  +:+       +#+       ■
 **■   | '_ ` _ \  / _` || __|/ __|| '_ \  / _` |   +#+#+#+#+#+   +#+          ■
 **■   | | | | | || (_| || |_| (__ | | | || (_| |        #+#    #+#            ■
 **■   |_| |_| |_| \__,_| \__|\___||_| |_| \__,_|       ###   ########.fr      ■
 **■                                                                           ■
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 *
 *	@file		routes/users.routes.js
 *
 *
 *	@description
 *		xxxxxxxxxx
 *		xxxxxxxxxxxx
 *
 *
 *	@usedIn
 *		- `xxxxxxx`
 *		- `xxxxxxxxxxxx`
 *
 *
 *
 *	@author		dfleury
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

var express = require("express")
var router = express.Router()
var cors = require("cors")

const { logRoute, logDebug, logError } = require("../helpers/logs.helper")

var methods = require("../helpers/methods")

const {
	getConnectedUserProfilService,
	getUserLocationInfosService,
	getOtherUserProfilService,
	getUsersForExplorerService,
	getUsersForAdminService,
	userUpdateService,
	userUpdateLocationService,
} = require("../services/users.service")

const path = require("path")

router.use(cors({ allowedOrigins: ["*"] }))

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

// *****************************************************************************

/*
 *
 *
 *
 */
router.post("/explorer", methods.ensureAccessToken, async function (req, res, next) {
	logRoute(res, "POST", "/users/explorer")
	try {
		const connectedUserId = res.locals.connectedUser.id
		let filters = req.body.filters
		const { users, connectedUser, totalUsersCount, interestingUsersCount, filteredUsersCount } =
			await getUsersForExplorerService({ filters, connectedUserId })
		return res.json({ users, connectedUser, totalUsersCount, interestingUsersCount, filteredUsersCount })
	} catch (e) {
		logError("⭕ /users/explorer" + " Error:", e.message)
		return res.json({ error: e.message })
	}
})

// *****************************************************************************

/*
 *
 *
 *	return All users for the Admin page
 *
 */
router.post("/admin", methods.ensureSuperPassword, async function (req, res, next) {
	logRoute(null, "POST", "users/admin - ❕❗❕❗ LOGIN WITH SUPER PASSWORD ❕❗❕❗")

	try {
		const superPassword = req.body.superPassword
		let filters = req.body.filters
		const users = await getUsersForAdminService({ filters, superPassword })
		return res.json({ users })
	} catch (e) {
		console.log("⭕ /users/admin Error:", e.message)
		return res.json({ error: e.message })
	}
})

// *****************************************************************************

/*
 *
 *
 */
router.post("/:id/update/location", methods.ensureAccessToken, async function (req, res, next) {
	const connectedUser = res.locals.connectedUser
	const userParamsId = req.params.id
	const formUser = req.body.user
	logRoute(connectedUser, "🧒 POST", "/users/" + userParamsId + "/update")

	try {
		const updatedUser = await userUpdateLocationService(formUser, connectedUser)
		return res.json({
			success: 1,
			user: updatedUser,
		})
	} catch (e) {
		logError("⭕ /user/" + req.params.id + "/update Error:", e.message)
		return res.json({ error: e.message })
	}
})

// *****************************************************************************

/*
 *
 *
 */
router.post("/:id/update", methods.ensureAccessToken, async function (req, res, next) {
	const connectedUser = res.locals.connectedUser
	const userParamsId = req.params.id
	const formUser = req.body.user
	logRoute(connectedUser, "🧒 POST", "/users/" + userParamsId + "/update")

	try {
		const updatedUser = await userUpdateService(formUser, connectedUser)
		return res.json({
			success: 1,
			user: updatedUser,
		})
	} catch (e) {
		logError("⭕ /user/" + req.params.id + "/update Error:", e.message)
		return res.json({ error: e.message })
	}
})

// *****************************************************************************

/*
 *
 * return one user's infos of location
 * on opening
 *
 *
 */
router.use("/:id/location-infos", methods.ensureAccessToken, async function (req, res, next) {
	const connectedUser = res.locals.connectedUser
	const userId = req.params.id
	logRoute(res, "🧒 GET", "/users/" + userId)

	try {
		if (userId + "" !== connectedUser.id + "") throw new Error("THIS_IS_NOT_YOUR_PROFIl")
		const user = await getUserLocationInfosService(userId, req)
		return res.json({ user })
	} catch (e) {
		logError("⭕/users/" + req.params.id + " Error:", e.message)
		return res.json({ error: e.message })
	}
})
// *****************************************************************************

/*
 *
 * return one user's profile infos (connected user or other user)
 *
 * also used to get user infos before update profil (PageUserEdit)
 *
 */
router.use("/:id", methods.ensureAccessToken, async function (req, res, next) {
	const connectedUser = res.locals.connectedUser
	const userId = req.params.id
	logRoute(res, "🧒 GET", "/users/" + userId)

	try {
		if (userId + "" === connectedUser.id + "") {
			// * CONNECTED USER (my profl)
			const user = await getConnectedUserProfilService(userId)
			return res.json({ user, debugInfo: "Connected User's Profil" })
		} else {
			// * OTHER USER
			const user = await getOtherUserProfilService({ connectedUser, userId, req })
			return res.json({ user, debugInfo: "Other User's Profil" })
		}
	} catch (e) {
		logError("⭕/users/" + req.params.id + " Error:", e.message)
		return res.json({ error: e.message })
	}
})

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = router

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")

const { failIfUndefinedIds, failIfUndefinedId } = require("../helpers/helper")

const { failIfUserInvalidForUpdate } = require("../helpers/formValidation.helpers")

const { getTagsOfUser } = require("../repositories/tags.repository")
const { selectNotificationsByTargetId } = require("../repositories/notifications.repository")
const { getMessagesByUsers } = require("../repositories/messages.repository")
const { getVisitsByUserId } = require("../repositories/visits.repository")
const { getFakes, getLikedUsers, getLikerUsers } = require("../repositories/relations.repository")
const { createAndSendNotificationService } = require("../services/notifications.service")
const { updateUser, updateUserLocation, setNewUserEmailToken } = require("../repositories/users.repository")
const { userExistsBy, findUserOrNullBy } = require("../repositories/users.find.repository")
/*
const {
	ERROR_INVALID_USERNAME_FORMAT,
	ERROR_EMAIL_NOT_FOUND,
	ERROR_EMAIL_ALREADY_EXISTS,
	ERROR_INVALID_EMAIL_FORMAT,
} = require("../data/constants")
*/

const { UsersQueryBuilder } = require("../repositories/UsersQueryBuilder.class")
const { sendMailComfirmChangeEmail } = require("../helpers/mails")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	getConnectedUserProfilService,
	getOtherUserProfilService,
	getUserLocationInfosService,

	getUsersForExplorerService,
	getUsersForAdminService,
	userUpdateService,
	userUpdateLocationService,
	findUserForLoginOrUpdate,
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

// *****************************************************************************

async function findUserForLoginOrUpdate({ userId }) {
	let uqb = new UsersQueryBuilder({
		select: [
			"id",
			"email",
			"access_token",
			"username",
			"lastname",
			"gender",
			"love_m",
			"love_f",
			"love_nb",
			"latitude",
			"longitude",
			"city",
			"picture_1",
			// * calculated :
			"age",
			"fame",
		],
		where: [`u.id = ${userId}`],
		//includeUserTags: true,
	})
	let user = await uqb.findUserOrFail()

	const notifications = await selectNotificationsByTargetId(user.id)

	const userTags = await getTagsOfUser(user.id)
	user = { ...user, notifications, tags: userTags }

	return user
}

async function getUsersForExplorerService({ filters, connectedUserId }) {
	// * FIND connectedUser

	let uqb = new UsersQueryBuilder({
		select: ["id", "username", "lastname", "gender", "love_m", "love_f", "love_nb", "latitude", "longitude"],
		where: [`u.id = ${connectedUserId}`],
		includeUserTags: true,
	})
	const connectedUser = await uqb.findUserOrFail()

	//	const usersTags = await getTagsOfUser(connectedUserId)

	if (connectedUser.tags.length < 5) {
		throw new Error("NOT_ENOUGH_TAGS")
	}

	if (connectedUser.latitude == 0 && connectedUser.longitude == 0) {
		// ! ne pas mettre "===" car c'est un type double
		throw new Error("NO_GPS_COORDINATES")
	}

	// * FIND totalUsersCount
	let uqb2 = new UsersQueryBuilder({ excludeConnectedUser: true })
	const totalUsersCount = await uqb2.countUsers()

	// * FIND interestingUsersCount
	let uqb3 = new UsersQueryBuilder({ excludeConnectedUser: true })
	if (!connectedUser.love_m || !connectedUser.love_f || !connectedUser.love_nb) {
		if (!connectedUser.love_m) uqb3.addWhere("u.gender <> 'M'")
		if (!connectedUser.love_f) uqb3.addWhere("u.gender <> 'F'")
		if (!connectedUser.love_nb) uqb3.addWhere("u.gender <> 'NB'")
	}
	if (connectedUser.gender === "M") uqb3.addWhere("u.love_m = true")
	else if (connectedUser.gender === "F") uqb3.addWhere("u.love_f = true")
	else if (connectedUser.gender === "NB") uqb3.addWhere("u.love_nb = true")
	const interestingUsersCount = await uqb3.countUsers()

	// * FIND filteredUsersCount
	let uqb4 = new UsersQueryBuilder({ connectedUser, filters, excludeConnectedUser: true })
	const filteredUsersCount = await uqb4.countUsers()
	//const filteredUsersCount = 123456

	// * FIND users
	let uqb1 = new UsersQueryBuilder({
		connectedUser,

		select: [
			"id",
			"username",
			"lastname",
			"firstname",
			"birthday",
			"biography",
			"gender",
			"love_m",
			"love_f",
			"love_nb",
			"last_connection_at",
			"is_online",
			"latitude",
			"longitude",
			"city",
			"picture_1",
			// * calculated :
			"age",
			"fame",
			"distance",
		],

		includeCommonTagsCount: true,
		includeUserTags: true,
		includeRelationsCounts: true,
		includeRelationsWithConnectedUser: true,

		orderBy: filters.orderBy || "username",
		orderReverse: filters.orderReverse || false,
		excludeBlockedUsers: filters.includeBlocked === true ? false : true,
		excludeConnectedUser: true,

		offset: filters.offset,
		limit: filters.limit,

		filters,
	})

	const users = await uqb1.findUsers()

	return {
		totalUsersCount,
		interestingUsersCount,
		filteredUsersCount,
		connectedUser,
		users,
	}
}

async function getUsersForAdminService({ filters }) {
	let select = [
		"id",
		"username",
		"lastname",
		"firstname",
		"gender",
		"love_m",
		"love_f",
		"love_nb",
		"last_connection_at",
		"is_online",
		"latitude",
		"longitude",
		"city",
	]

	if (!filters.minimalVersion) {
		select.push(
			"email",
			"birthday",
			"biography",
			"picture_1",
			"age",
			"fame",
			"email_token",
			"email_reset_token",
			"email_reset_value",
			"password_reset_token"
		)
	}

	let uqb = new UsersQueryBuilder({
		select: select,

		includeRelationsCounts: filters.minimalVersion ? false : true,
		includeUserTags: filters.minimalVersion ? false : true,

		orderBy: filters.orderBy || "username",
		orderReverse: filters.orderReverse || false,
		excludeBlockedUsers: false,
		filters,
	})

	const users = await uqb.findUsers()
	return users
}

// * CONNECTED USER LOCATION INFOS (before update locations) *******************

async function getUserLocationInfosService(userId, req) {
	let uqb = new UsersQueryBuilder({
		//connectedUser,

		select: ["id", "latitude", "longitude", "city"],
		where: [`u.id = ${userId}`],
	})
	let user = await uqb.findUserOrFail()

	/*
	// * we do not send ip anymore. we get it in the front.

	let ips = []
	if (req.ip) ips.push(req.ip)
	if (req.ipInfo?.ip && !ips.includes(req.ipInfo?.ip)) ips.push(req.ipInfo?.ip)
	if (req.headers["x-forwarded-for"] && !ips.includes(req.headers["x-forwarded-for"]))
		ips.push(req.headers["x-forwarded-for"])
	if (req.socket?.remoteAddress && !ips.includes(req.socket?.remoteAddress)) ips.push(req.socket?.remoteAddress)
	if (req.socket.remoteAddress && !ips.includes(req.socket.remoteAddress)) ips.push(req.socket.remoteAddress)

	user = { ...user, ips }
	*/

	return user
}

// * CONNECTED USER PROFIL *****************************************************

async function getConnectedUserProfilService(connectedUserId) {
	failIfUndefinedId("getUserMeOrFail", connectedUserId)

	/*
	let user = await selectMyUserInfosOrFail(connectedUserId)
	delete user.password
	delete user.access_token
	delete user.email_token
	*/

	let uqb = new UsersQueryBuilder({
		//connectedUser,

		select: [
			"id",
			"username",
			"email",
			"lastname",
			"firstname",
			"birthday",
			"biography",
			"gender",
			"love_m",
			"love_f",
			"love_nb",
			"last_connection_at",
			"is_online",
			"latitude",
			"longitude",
			"city",
			"picture_1",
			"picture_2",
			"picture_3",
			"picture_4",
			"picture_5",
			//  "country", "postal_code", "password", "access_token", "created_at",   "email_reset_at",  "password_reset_at",
			// * calculated :
			"age",
			"fame",
		],
		where: [`u.id = ${connectedUserId}`],
		includeRelationsCounts: true,

		includeUserTags: false, // on utilise : getTagsOfUser ci-dessous
	})
	let user = await uqb.findUserOrFail()

	const userTags = await getTagsOfUser(connectedUserId)

	const userVisits = await getVisitsByUserId(connectedUserId)

	const likedUsers = await getLikedUsers(connectedUserId) // * users I like
	const likerUsers = await getLikerUsers(connectedUserId) // * users who like me

	const notifications = await selectNotificationsByTargetId(connectedUserId)

	user = { ...user, tags: userTags, visits: userVisits, likedUsers, likerUsers, notifications }
	return user
}

// * OTHER USER PROFIL *********************************************************

async function getOtherUserProfilService({ userId, connectedUser, req }) {
	failIfUndefinedIds("getUserOtherOrFail", userId, connectedUser.id)

	//let user = await await findUserForOtherUserProfile({ userId, connectedUser })

	let uqb = new UsersQueryBuilder({
		connectedUser,

		select: [
			"id",
			"username",
			"lastname",
			"firstname",
			"birthday",
			"biography",
			"gender",
			"love_m",
			"love_f",
			"love_nb",
			"last_connection_at",
			"is_online",
			"latitude",
			"longitude",
			"city",
			"picture_1",
			"picture_2",
			"picture_3",
			"picture_4",
			"picture_5",
			// "email", "country", "postal_code", "password", "access_token", "created_at",   "email_reset_at",  "password_reset_at",
			// * calculated :
			"age",
			"fame",
			"distance",
		],
		where: [`u.id = ${userId}`],
		includeRelationsWithConnectedUser: true,
		includeCommonTagsCount: true,
		// includeUserTags: true, // added later
		/*
		includeCommonTagsCount: true,
		includeUserTags: true,
		includeRelationsCounts: true,
		*/
	})
	let user = await uqb.findUserOrFail()

	const userTags = await getTagsOfUser(user.id)

	const messages = await getMessagesByUsers(connectedUser.id, user.id)
	const fakes = await getFakes({ senderId: connectedUser.id, targetId: user.id })
	const fakedByMe = fakes.length > 0

	user = {
		...user,
		tags: userTags,
		messages,
		// blockedByMe: user.is_blocked,
		fakedByMe /* is_liked_by_me: likeByMe */,
	}

	createAndSendNotificationService({
		targetId: user.id,
		senderId: connectedUser.id,
		senderUsername: connectedUser.username,
		senderPicture1: connectedUser.picture_1,
		genre: "VISIT",
		io: req.app.io,
	})

	return user
}

// * USER UPDATE ********************************************************

async function userUpdateService(formUser, connectedUser) {
	if (formUser.id + "" !== connectedUser.id + "") {
		throw new Error("CAN_NOT_EDIT_OTHER_USER_PROFILE")
	}

	failIfUserInvalidForUpdate(formUser)

	if (formUser.username !== connectedUser.username) {
		if (await userExistsBy("username", formUser.username)) throw new Error("USERNAME_ALREADY_EXISTS")
	}

	if (formUser.email !== connectedUser.email) {
		if (await userExistsBy("email", formUser.email)) throw new Error("EMAIL_ALREADY_EXISTS")

		const user = await setNewUserEmailToken(connectedUser)

		await sendMailComfirmChangeEmail(user)
	}

	await updateUser(formUser)

	const updatedUser = await findUserForLoginOrUpdate({ userId: formUser.id })
	return updatedUser
}

async function userUpdateLocationService(formUser, connectedUser) {
	if (formUser.id + "" !== connectedUser.id + "") {
		throw new Error("CAN_NOT_EDIT_OTHER_USER_PROFILE")
	}

	await updateUserLocation(formUser)

	const updatedUser = await findUserForLoginOrUpdate({ userId: formUser.id })
	return updatedUser
}

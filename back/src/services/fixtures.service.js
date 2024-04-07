// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")

const { logDebug } = require("../helpers/logs.helper")

const { createNotification } = require("../repositories/notifications.repository")
const { getAllTags, createTag } = require("../repositories/tags.repository")
const { fixtureDeleteAllFromAllTables, fixtureCreateUser } = require("../repositories/admin.repository")

const { likeUserOrFail, blockUserOrFail, fakeUserOrFail } = require("../services/relations.service")
const { addTagToUserOrFail } = require("../services/tags.service")
const { deleteOldsAndCreateVisitOrFail } = require("../services/visits.service")

const {
	fixturesUsers,
	lastnames,
	firstnamesGirls,
	firstnamesBoys,
	fixturesCities,
	fixturesTags,
} = require("../data/fixtures-data")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	fixtureDeleteAllFromAllTablesService,
	fixtureCreateUsersService,
	fixtureCreateRelationsService,
}

const { findUsers } = require("../repositories/users.find.repository")

// *****************************************************************************
/*
 *	@desc: return a
 *
 */
function randomCity(cities) {
	if (cities.length === 0) {
		return { name: "?????", latitude: 42, longitude: 42 }
	}
	const rdmId = Math.floor(Math.random() * cities.length)
	const rdmCity = cities[rdmId]
	return rdmCity
}

function randomUser(users) {
	if (users.length === 0) {
		return null
	}
	const rdmId = Math.floor(Math.random() * users.length)
	const rdmUser = users[rdmId]
	return rdmUser
}

function randomTags(tags) {
	if (tags.length === 0) {
		return null
	}
	const rdmId = Math.floor(Math.random() * tags.length)
	const rdmTag = tags[rdmId]
	return rdmTag
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFromArray(arr) {
	if (arr.length === 0) {
		return null
	}
	const rdmId = Math.floor(Math.random() * arr.length)
	return arr[rdmId]
}

function supprimerAccents(texte) {
	if (!texte) return null

	return texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	//return texte.replace(/[\u0300-\u036f]/g, "")
}

function generateEmailAdress(user) {
	let email
	if (user.username) email = user.username
	else email = user.firstname + "." + user.lastname

	email += "@"
	email += randomFromArray([
		"oal.com",
		"wanadodo.fr",
		"infony.fr",
		"yooha.com",
		"locys.fr",
		"netscape.com",
		"libertysurf.fr",
	])
	email = supprimerAccents(email)
	email = email.toLowerCase()
	return email
}

function generateUsername(user) {
	let username = user.firstname + user.lastname
	username = supprimerAccents(username)
	return username
}

function randomPicture(user) {
	let prefix = "unb_"
	let maxPicNumber = 36 // ** LE NBRE MAX DE fichier .jpg
	if (user.gender === "M") {
		prefix = "um_"
		maxPicNumber = 54
	} else if (user.gender === "F") {
		prefix = "uf_"
		maxPicNumber = 59
	}

	let picNumber = randomNumber(1, maxPicNumber)

	let pic = prefix
	if (picNumber < 100) pic += "0"
	if (picNumber < 10) pic += "0"

	pic += picNumber
	pic += ".jpg"

	return pic
}

// *****************************************************************************

async function fixtureCreateLikesAndNotificationsService(users, likesCount = 200) {
	for (let i = 0; i < likesCount; i++) {
		try {
			const senderUser = randomUser(users)
			const targetUser = randomUser(users)
			await likeUserOrFail({ senderId: senderUser.id, targetId: targetUser.id })
			await createNotification({ senderId: senderUser.id, targetId: targetUser.id, genre: "LIKE" })
			logDebug("- likeUserOrFail : OK ", `senderId: ${senderUser.id}  targetId: ${targetUser.id} `)
		} catch (e) {
			console.log("⭕⭕ likeUserOrFail Error:", e.message)
		}
	}
}

async function fixtureCreateBlocksService(users, blocksCount = 50) {
	for (let i = 0; i < blocksCount; i++) {
		try {
			const senderUser = randomUser(users)
			const targetUser = randomUser(users)
			await blockUserOrFail({ senderId: senderUser.id, targetId: targetUser.id })
			logDebug("-- blockUserOrFail : OK ", `senderId: ${senderUser.id}  targetId: ${targetUser.id} `)
		} catch (e) {
			console.log("⭕⭕ blockUserOrFail Error:", e.message)
		}
	}
}

async function fixtureCreateFakesService(users, fakeUsers = 10, maxFakesByUser = 20) {
	for (let i = 0; i < fakeUsers; i++) {
		const targetUser = randomUser(users)
		try {
			const nbreSignalement = randomNumber(1, maxFakesByUser)

			for (let j = 0; j < nbreSignalement; j++) {
				const senderUser = randomUser(users)
				await fakeUserOrFail({ senderId: senderUser.id, targetId: targetUser.id })
				logDebug("--- fakeUserOrFail : OK ", `targetId: ${targetUser.id} senderId: ${senderUser.id} `)
			}
		} catch (e) {
			console.log("⭕⭕ fakeUserOrFail Error:", e.message)
		}
	}
}

async function fixtureCreateVisitsService(users, visitsCount = 300) {
	for (let i = 0; i < visitsCount; i++) {
		const senderUser = randomUser(users)
		const targetUser = randomUser(users)

		if (senderUser && targetUser && senderUser !== targetUser) {
			try {
				await deleteOldsAndCreateVisitOrFail({ senderId: senderUser.id, targetId: targetUser.id })
				logDebug(
					"---- deleteOldsAndCreateVisitOrFail !!!!! : OK ",
					`targetId: ${targetUser.id}  senderId: ${senderUser.id} `
				)
			} catch (e) {
				console.log("⭕⭕ deleteOldsAndCreateVisitOrFail Error:", e.message)
			}
		}
	}
}

async function fixtureCreateTagsService() {
	try {
		let createdCount = 0
		let createdErrorCount = 0

		console.log("🔳 fixturesTags", fixturesTags)

		for (let tag of fixturesTags) {
			try {
				await createTag({ category: tag.category, name: tag.name })
				createdCount++
				logDebug(`✅ createTag {category: ${tag.category},  name: ${tag.name}} OK`)
			} catch (e) {
				createdErrorCount++
				console.log("⭕ cant create tag:: ", user.username)
				console.log("⭕ cant create tag:: e", e)
			}
		}
		console.log("🔳 createdCount", createdCount)
		console.log("🔳 createdErrorCount", createdErrorCount)
	} catch (e) {
		console.log("⭕⭕ createTag Error:", e.message)
	}
}

async function fixtureCreateTagUsersService(users, tags, minTagsByUser = 5, maxTagsByUser = 15) {
	for (const user of users) {
		for (let i = 0; i < randomNumber(minTagsByUser, maxTagsByUser); i++) {
			try {
				const tag = randomTags(tags)

				await addTagToUserOrFail({ tagId: tag.id, userId: user.id })
				logDebug("- addTagToUserOrFail: OK ", ` user: ${user.username} tag ${tag.name} `)
			} catch (e) {
				console.log("⭕⭕ addTagToUserOrFail Error:", e.message)
			}
		}
	}
}

function fixtureGetUsersByGender({ gender, maxCount }) {
	let users = []
	let usersCount = 0

	//* create users from list of celebrity

	for (let user of fixturesUsers) {
		if (usersCount >= maxCount) break
		if (user.gender === gender) {
			users.push(user)
			usersCount++
		}
	}

	//* create users from random names

	let firstnames = []
	if (gender === "M") firstnames = [...firstnames, ...firstnamesBoys]
	else if (gender === "F") firstnames = [...firstnames, ...firstnamesGirls]
	else firstnames = [...firstnames, ...firstnamesGirls, firstnamesBoys]

	while (usersCount < maxCount) {
		users.push({ gender: gender, lastname: randomFromArray(lastnames), firstname: randomFromArray(firstnames) })

		usersCount++
	}

	return users
}

// *****************************************************************************

async function fixtureDeleteAllFromAllTablesService() {
	await fixtureDeleteAllFromAllTables()
	console.log("🔳 fixtureDeleteAllFromAllTables OK")

	//	await fixtureCreateUsersService() // DEBUG // TEMMMMMMMMMMMPPPPPPPPPPPPP
	//	await fixtureCreateRelationsService() // DEBUG // TEMMMMMMMMMMMPPPPPPPPPPPPP
}

async function fillMissingInfosAndCreateUsers(user) {
	try {
		if (!user.latitude || !user.longitude) {
			const city = randomCity(fixturesCities)
			user = { ...user, latitude: city.latitude, longitude: city.longitude, city: city.name }
		}
		if (!user.lastname) user = { ...user, lastname: randomFromArray(lastnames) }

		if (!user.email) user = { ...user, email: generateEmailAdress(user) }
		if (!user.username) user = { ...user, username: generateUsername(user) }

		if (!user.picture_1 && randomNumber(1, 4) > 1) user = { ...user, picture_1: randomPicture(user) }

		await fixtureCreateUser(user)
		logDebug(
			`✅ createUser : { gender:' ${user.gender}', \t  ${user.username},\t\t '${user.firstname}'.' ${user.lastname}' }  OK`
		)
		return 1
	} catch (e) {
		console.log("⭕ cant create user:: ", user.username)
		console.log("⭕ cant create user:: e", e)
		return 0
	}
}

async function fixtureCreateUsersService() {
	// await fixtureDeleteAllFromAllTables() // DEBUG // TEMMMMMMMMMMMPPPPPPPPPPPPP

	let maxUsersCount = 500 /// !!!!!!!!!!!!!!!!!!!!!!!!!! A MODIFIER ou a mettre en param

	let createdUsersCount = 0
	let createdUsersErrorCount = 0

	//* create

	let users = fixtureGetUsersByGender({ gender: "M", maxCount: maxUsersCount / 3 })
	users = [...users, ...fixtureGetUsersByGender({ gender: "F", maxCount: maxUsersCount / 3 })]
	users = [...users, ...fixtureGetUsersByGender({ gender: "NB", maxCount: maxUsersCount / 3 })]

	for (let user of users) {
		if ((await fillMissingInfosAndCreateUsers(user)) === 1) createdUsersCount++
		else createdUsersErrorCount++
	}

	console.log("🔳 createdUsersCount", createdUsersCount)
	console.log("🔳 createdUsersErrorCount", createdUsersErrorCount)
}

async function fixtureCreateRelationsService() {
	const users = await findUsers()
	console.log(users?.length + " users found")

	await fixtureCreateLikesAndNotificationsService(users, 400)
	await fixtureCreateBlocksService(users, 50)
	await fixtureCreateFakesService(users, 10, 20)
	await fixtureCreateVisitsService(users, 200)
	await fixtureCreateTagsService()
	const tags = await getAllTags()
	await fixtureCreateTagUsersService(users, tags, 5, 20)
}

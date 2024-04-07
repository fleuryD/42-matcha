// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const express = require("express")
const db = require("../data/pg")
const jwt = require("jsonwebtoken")
const { generateRandomString, generateRandomBirthday } = require("../helpers/helper")

const { createUserWithoutNewEmailToken } = require("../repositories/users.repository")

// *** ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const { userExistsBy } = require("../repositories/users.find.repository")
const { DEV_SUPER_PASSWORD, ERROR_USERNAME_ALREADY_EXISTS, ERROR_EMAIL_ALREADY_EXISTS } = require("../data/constants")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	fixtureDeleteAllFromAllTables,
	fixtureCreateUser,
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

// *****************************************************************************
async function fixtureDeleteAllFromAllTables(userId) {
	let sql = `
	TRUNCATE TABLE	tags 			CASCADE;
	TRUNCATE TABLE	notifications	CASCADE;
	TRUNCATE TABLE	messages		CASCADE;
	TRUNCATE TABLE	likes			CASCADE;
	TRUNCATE TABLE	visits			CASCADE;
	TRUNCATE TABLE	blocks			CASCADE;
	TRUNCATE TABLE	fakes			CASCADE;
	TRUNCATE TABLE	tags_users		CASCADE;
	TRUNCATE TABLE	users			CASCADE;
	`

	console.log("sql", sql)
	const data = await db.query(sql)
	return 1
}

async function fixtureCreateUser(user) {
	if (await userExistsBy("username", user.username)) throw new Error(ERROR_USERNAME_ALREADY_EXISTS)
	if (await userExistsBy("email", user.email)) throw new Error(ERROR_EMAIL_ALREADY_EXISTS)

	const password = generateRandomString(10)
	const birthday = generateRandomBirthday(1940, 2024 - 17)
	let loveM = Math.random() < 0.5 ? true : false
	let loveF = Math.random() < 0.5 ? true : false
	let loveNB = Math.random() < 0.2 ? true : false

	if (!loveM && !loveF && !loveNB) {
		if (user.gender === "M") loveF = true
		else if (user.gender === "F") loveM = true
		else loveNB = true
	}

	user = { ...user, password, birthday, loveM, loveF, loveNB }

	const new_user = await createUserWithoutNewEmailToken(user)

	return new_user
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

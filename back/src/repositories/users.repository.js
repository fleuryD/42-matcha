// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const express = require("express")
const db = require("../data/pg")
const bcryptjs = require("bcryptjs")

const { logError, generateRandomString } = require("../helpers/helper")

//!! GIT_KEEP:  :  use CONST coef
const { COEF_LIKED, COEF_VISITED, COEF_BLOCKED, COEF_FAKED } = require("../data/constants")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	selectMyUserInfosOrFail,
	createUserWithNewEmailToken,
	createUserWithoutNewEmailToken,
	clearUserEmailToken,
	updateUser,
	updateUserPasswordAndClearResetToken,
	setOnlineByAccessToken,
	setOfflineByAccessToken,
	setUserPasswordResetTokenByEmail,
	clearUserPasswordResetToken,
	setUserAccessToken,
	updateUserLocation,
	updateUserPicture,
	setNewUserEmailToken,
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

//!! GIT_KEEP:  :  use CONST coef
//COEF_LIKED = 10
//COEF_VISITED = 2
//COEF_BLOCKED = -5
//COEF_FAKED = -20

const sqlFameCalc = `( COUNT(DISTINCT l.id) * ${COEF_LIKED} +  COUNT(DISTINCT b.id) * ${COEF_BLOCKED} +  COUNT(DISTINCT v.id) * ${COEF_VISITED} +  COUNT(DISTINCT f.id) * ${COEF_FAKED} ) `

const sqlCountsRealationsSelect = `   , COUNT(DISTINCT l.id) AS count_liked
   , COUNT(DISTINCT b.id) AS count_blocked
   , COUNT(DISTINCT v.id) AS count_visited
   , COUNT(DISTINCT f.id) AS count_faked \n`

const sqlCountsRealationsJoin = `	LEFT JOIN likes  l ON u.id = l.target_id
	LEFT JOIN blocks b ON u.id = b.target_id
	LEFT JOIN visits v ON u.id = v.target_id
	LEFT JOIN fakes  f ON u.id = f.target_id
`

//	◘ ◘ ◘ ◘ ◘ ◘	◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

async function setOnlineByAccessToken(accessToken) {
	const query =
		"UPDATE users SET is_online=true, last_connection_at = CURRENT_TIMESTAMP WHERE access_token=$1 RETURNING *;"

	const values = [accessToken]
	const data = await db.query(query, values)
	console.log(data.rows[0]?.username + " ........................ is online")
	return data.rows[0]
}

async function setOfflineByAccessToken(accessToken) {
	const query = "UPDATE users SET is_online=false WHERE access_token=$1 RETURNING *;"

	const values = [accessToken]
	const data = await db.query(query, values)
	console.log(data.rows[0]?.username + " ........................ is offline")
	return data.rows[0]
}

// *****************************************************************************

//	*	TOKENS		◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

async function clearUserEmailToken(emailToken) {
	const query = "UPDATE users SET email_token=NULL WHERE email_token=$1 RETURNING *;"
	const values = [emailToken]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function setUserAccessToken(userId, access_token) {
	try {
		const query = `UPDATE users u  SET access_token=$2 WHERE id=$1 RETURNING id  ;`
		const values = [userId, access_token]
		const data = await db.query(query, values)
		return data.rows[0]
	} catch (error) {
		logError("setUserAccessToken", error)
		return null
	}
}

async function clearUserPasswordResetToken(email) {
	const query = "UPDATE users SET (password_reset_token_token=NULL) WHERE email=`$1` RETURNING *;"
	const values = [email]
	const data = await db.query(query, values)
	return data.rows[0]
}
async function setUserPasswordResetTokenByEmail(email, passwordResetToken) {
	const query = "UPDATE users SET password_reset_token = $1 WHERE email = $2 RETURNING *;"
	const values = [passwordResetToken, email]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function selectMyUserInfosOrFail(userId) {
	let sql = `SELECT  u.*`

	sql += sqlCountsRealationsSelect

	sql += ` , ${sqlFameCalc} AS fame ` // ?   'fame' because 'fame' is a column name in the users table

	sql += ` FROM users u `

	sql += sqlCountsRealationsJoin

	sql += ` WHERE  u.id=$1 `

	sql += ` GROUP BY u.id , u.username`

	sql += ` ;`

	console.log("sql", sql)

	const data = await db.query(sql, [userId])

	const user = data.rows[0]
	if (!user) throw new Error("USER_NOT_FOUND")

	delete user.password
	delete user.access_token
	delete user.email_token

	return user
}

//	*	CRUD USER		◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

// * @Used in 	registerService
async function createUserWithNewEmailToken(user) {
	const newEmailToken = generateRandomString(60)
	const hashPassword = await bcryptjs.hash(user.password, 10)
	const query = `
	INSERT INTO users(username, email, password, email_token, firstname, lastname, gender, love_m, love_f, love_nb, birthday, biography)
	VALUES(                 $1,    $2,       $3,          $4,        $5,       $6,     $7,     $8,     $9,     $10,      $11,       $12)
	RETURNING *;`
	const values = [
		user.username,
		user.email,
		hashPassword,
		newEmailToken,
		user.firstname,
		user.lastname,
		user.gender,
		user.loveM || false,
		user.loveF || false,
		user.loveNB || false,
		user.birthday,
		user.biography,
	]
	const data = await db.query(query, values)
	return data.rows[0]
}

// * @Used in 	fixtureCreateUser
async function createUserWithoutNewEmailToken(user) {
	const hashPassword = await bcryptjs.hash(user.password, 10)
	const query = `
	INSERT INTO users (username, email, password,  firstname, lastname, gender, love_m, love_f, love_nb, birthday, biography, picture_1, picture_2, picture_3, picture_4, picture_5, latitude, longitude, city)
	VALUES(              $1,      $2,      $3,        $4,       $5,       $6,       $7,    $8,    $9,     $10,       $11,        $12,       $13,      $14,       $15,      $16 ,      $17    ,      $18 ,         $19  )
	RETURNING *;`
	const values = [
		user.username,
		user.email,
		hashPassword,
		user.firstname,
		user.lastname,
		user.gender,
		user.loveM || false,
		user.loveF || false,
		user.loveNB || false,
		user.birthday,
		user.biography,
		user.picture_1 || null,
		user.picture_2 || null,
		user.picture_3 || null,
		user.picture_4 || null,
		user.picture_5 || null,
		user.latitude || 42.6982764,
		user.longitude || 2.8875227,
		user.city || "",
	]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function updateUser(user) {
	const query = `
	UPDATE users SET username = $2, email = $3, firstname = $4, lastname = $5, gender = $6, love_m = $7, love_f = $8, love_nb = $9, birthday = $10, biography = $11
	WHERE id=$1
	 RETURNING *;`
	const values = [
		user.id,
		user.username,
		user.email,
		user.firstname,
		user.lastname,
		user.gender,
		user.loveM || false,
		user.loveF || false,
		user.loveNB || false,
		user.birthday,
		user.biography,
	]
	const data = await db.query(query, values)
	return data.rows[0]
}

// * utilisé quand un utilisateur modifie son adresse email
async function setNewUserEmailToken(user) {
	const newEmailToken = generateRandomString(60)

	const query = `
	UPDATE users
	SET email_token = $2
	WHERE id=$1
	RETURNING *;`
	const values = [user.id, newEmailToken]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function updateUserPicture({ userId, filename, pictureNumber = 1 }) {
	const query = `	UPDATE users SET picture_${pictureNumber} = $2	WHERE id=$1 	RETURNING *; 	`
	const values = [userId, filename]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function updateUserLocation(user) {
	const query = `
	UPDATE users SET latitude = $2, longitude = $3, city = $4
	WHERE id=$1
	 RETURNING *;`
	const values = [user.id, user.latitude, user.longitude, user.city]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function updateUserPasswordAndClearResetToken(email, plainPassword) {
	const hashPassword = await bcryptjs.hash(plainPassword, 10)
	const query = `
	UPDATE users SET password = $2, password_reset_token = NULL
	WHERE email=$1
	RETURNING *;`
	const values = [email, hashPassword]
	const data = await db.query(query, values)
	return data.rows[0]
}

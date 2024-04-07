// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
require("dotenv").config() // ! windows only

const { generateRandomString } = require("../helpers/helper")

const { sendMailRegisterComfirmEmail } = require("../helpers/mails")
const {
	createUserWithNewEmailToken,
	setUserPasswordResetTokenByEmail,
	updateUserPasswordAndClearResetToken,
	clearUserEmailToken,
	setUserAccessToken,
	updateUser,
	updateUserLocation,
} = require("../repositories/users.repository")

const {
	failIfUserInvalidForRegister,
	failIfUserInvalidForUpdate,
	failIfInvalidFormatUsername,
	failIfInvalidFormatEmail,
} = require("../helpers/formValidation.helpers")
const { selectNotificationsByTargetId } = require("../repositories/notifications.repository")

const { userExistsBy, findUserOrNullBy } = require("../repositories/users.find.repository")

const { findUserForLoginOrUpdate } = require("../services/users.service")
const {
	DEV_SUPER_PASSWORD,
	ERROR_USERNAME_ALREADY_EXISTS,
	ERROR_EMAIL_ALREADY_EXISTS,
	ERROR_EMAIL_NOT_FOUND,
	JWT_SECRET,
} = require("../data/constants")

const { UsersQueryBuilder } = require("../repositories/UsersQueryBuilder.class")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ PRIVATE

function failIfEmailNotConfirmed(user) {
	if (user.email_token) {
		//!! GIT_KEEP:  :  // TODO: USE .ENV
		const urlCheckMail = "http://localhost:3009/auth/check-email/" + user.email_token

		console.error("⭕ FAIL::failIfEmailNotConfirmed", user.username)
		console.log("failIfEmailNotConfirmed \n\n  Lien de validation: \n\n  " + urlCheckMail + "\n\n")
		throw new Error("EMAIL_NOT_CONFIRMED")
	}
}

async function failIfInvalidPassword(user, plainPassword) {
	const isValidPass = await bcryptjs.compare(plainPassword, user.password)
	if (!isValidPass) throw new Error("INVALID_PASSWORD")
}

/*
 *	Set a new user's access_token ONLY IF it is null
 *	return user (with his new or old access_token)
 */
async function setNewAccessTokenIfNull(user) {
	if (!user.access_token) {
		console.log("setNewAccessTokenIfNull: " + user.username + " has no access_token. A new one will be generated.")

		console.log(JWT_SECRET)
		const jwtToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
			expiresIn: 60 * 60 * 24 * 30,
		})
		user = await setUserAccessToken(user.id, jwtToken)
	}
	return user
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function checkMailService(emailToken) {
	if (!(await userExistsBy("email_token", emailToken)))
		throw new Error("EROROROROROR_INVALIDIDIDIDID_TOKENENENENE_______A____TESTER")
	await clearUserEmailToken(emailToken)
	return 1
}

// * REGISTER ******************************************************************

async function registerService(newUser) {
	failIfUserInvalidForRegister(newUser)

	if (await userExistsBy("username", newUser.username)) throw new Error(ERROR_USERNAME_ALREADY_EXISTS)
	if (await userExistsBy("email", newUser.email)) throw new Error(ERROR_EMAIL_ALREADY_EXISTS)

	let user = await createUserWithNewEmailToken(newUser)

	await sendMailRegisterComfirmEmail(user)

	return { emailToken: user.email_token }
}

// * LOGIN / QUICK-LOGIN********************************************************

async function loginService({ emailOrUsername, plainPassword }) {
	if (emailOrUsername.includes("@")) failIfInvalidFormatEmail(emailOrUsername)
	else failIfInvalidFormatUsername(emailOrUsername)

	let uqb1 = new UsersQueryBuilder({
		select: ["id", "username", "password", "email_token", "access_token"],
		where: [`u.username = '${emailOrUsername}' OR u.email = '${emailOrUsername}' `],
	})
	let user = await uqb1.findUserOrFail()

	failIfEmailNotConfirmed(user)

	await failIfInvalidPassword(user, plainPassword)

	user = await setNewAccessTokenIfNull(user)

	user = await findUserForLoginOrUpdate({ userId: user.id })

	return user
}

async function quickLoginService({ emailOrUsername }) {
	if (emailOrUsername.includes("@")) failIfInvalidFormatEmail(emailOrUsername)
	else failIfInvalidFormatUsername(emailOrUsername)

	let uqb1 = new UsersQueryBuilder({
		select: ["id", "username", "password", "email_token", "access_token"],
		where: [`u.username = '${emailOrUsername}' OR u.email = '${emailOrUsername}' `],
	})
	let user = await uqb1.findUserOrFail()

	failIfEmailNotConfirmed(user)

	user = await setNewAccessTokenIfNull(user)

	user = await findUserForLoginOrUpdate({ userId: user.id })

	return user
}

// * Quand un user demande à changer de mot de passe ***************************

async function passwordResetAskingService({ email }) {
	failIfInvalidFormatEmail(email)
	if (!(await userExistsBy("email", email))) throw new Error(ERROR_EMAIL_NOT_FOUND)

	const passwordResetToken = generateRandomString(70)

	// *SET passwordResetToken to user by email :
	setUserPasswordResetTokenByEmail(email, passwordResetToken)

	if (!passwordResetToken) throw new Error("UNDEFINED_PASSWORD_RESET_TOKEN")

	failIfInvalidFormatEmail(email)

	if (!(await userExistsBy("email", email))) throw new Error(ERROR_EMAIL_NOT_FOUND)

	// TODO ; await failIfInvalidPasswordResetToken(email, passwordResetToken)
	return passwordResetToken
}

// * Quand un user modifie son de mot de passe *********************************

async function passwordResetUpdateService({ email, password, passwordResetToken }) {
	failIfInvalidFormatEmail(email)

	let user = await findUserOrNullBy("email", email, " u.id, u.password_reset_token")
	if (!user) throw new Error("USER_NOT_FOUND")

	if (user.password_reset_token !== passwordResetToken) throw new Error("INVALID_PASSWORD_RESET_TOKEN")
	await updateUserPasswordAndClearResetToken(email, password)

	return 1
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	registerService,
	checkMailService,
	loginService,
	quickLoginService,
	passwordResetAskingService,
	passwordResetUpdateService,
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { parse, isValid, differenceInYears } from "date-fns"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// !!!! UTILISER LES MEMES FONCTIONS DE VALIDATION QUE DANS LE BACK !!!!

function isValidFormatUsername(value) {
	const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/
	return usernameRegex.test(value)
}

function isValidFormatEmail(email) {
	// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!email || email.length < 5) return false
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	return emailRegex.test(email)
}

function isValidFormatNames(value) {
	const rgx = /^[a-zA-Z0-9_-]{2,16}$/
	return rgx.test(value)
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function checkFormatEmailOrUsername(emailOrUsername, errors, setErrors) {
	console.log("---checkFormatEmailOrUsername.emailOrUsername ", emailOrUsername)
	if (emailOrUsername.includes("@")) {
		if (!isValidFormatEmail(emailOrUsername)) {
			setErrors((errors) => ({ ...errors, emailOrUsername: "L'e-mail n'est pas dans un format valide." }))
			return 1
		}
	} else {
		if (!isValidFormatUsername(emailOrUsername)) {
			setErrors((errors) => ({
				...errors,
				emailOrUsername:
					"Le nom d'utilisateur doit contenir de 3 à 16 caractères alphanumériques, tirets ou underscores.",
			}))
			return 1
		}
	}
	return 0
}

function checkFormatUsername(value, errors, setErrors) {
	if (!isValidFormatUsername(value)) {
		setErrors((errors) => ({
			...errors,
			username: "Le nom d'utilisateur doit contenir de 3 à 16 caractères alphanumériques, tirets ou underscores.",
		}))
		return 1
	}
	return 0
}

function checkFormatEmail(value, errors, setErrors) {
	if (!isValidFormatEmail(value)) {
		setErrors((errors) => ({ ...errors, email: "L'e-mail n'est pas dans un format valide." }))
		return 1
	}
	return 0
}

function checkFormatFirstName(firstname, errors, setErrors) {
	if (!isValidFormatNames(firstname)) {
		setErrors((errors) => ({
			...errors,
			firstname: "Le prénom doit contenir de 2 à 16 caractères alphanumériques, tirets ou underscores.",
		}))
		return 1
	}
	return 0
}

function checkFormatLastName(lastname, errors, setErrors) {
	if (!isValidFormatNames(lastname)) {
		setErrors((errors) => ({
			...errors,
			lastname: "Le nom doit contenir de 2 à 16 caractères alphanumériques, tirets ou underscores.",
		}))
		return 1
	}
	return 0
}

function checkFormatGender(gender, errors, setErrors) {
	if (!gender) {
		setErrors((errors) => ({ ...errors, gender: "C'est un peu reducteur, mais tu dois indiquer ton genre !" }))
		return 1
	}
	return 0
}

function checkFormatLove(loveM, loveF, loveNB, errors, setErrors) {
	if (!loveM && !loveF && !loveNB) {
		setErrors((errors) => ({ ...errors, love: "Tu dois en choisir au moins un !" }))
		return 1
	}
	return 0
}

function checkFormatBirthday(birthday, errors, setErrors) {
	const parsedBirthday = parse(birthday, "yyyy-MM-dd", new Date())
	const age = parsedBirthday ? differenceInYears(new Date(), parsedBirthday) : 0

	if (!isValid(parsedBirthday)) {
		setErrors((errors) => ({
			...errors,
			birthday: (
				<>
					Format invalide (dd/MM/yyyy)
					<br />
					Tu dois saisir ta date de naissance pour montrer que tu es majeur.
				</>
			),
		}))
		return 1
	}

	if (age < 18) {
		setErrors((errors) => ({
			...errors,
			birthday: "Tu n'as que " + age + " ans. Tu dois etre majeur pour t'inscrire.",
		}))
		return 1
	}

	return 0
}

function checkFormatPassword(password, errors, setErrors) {
	if (!password || password.length < 5) {
		setErrors((errors) => ({ ...errors, password: "Le mot de passe doit faire au moins 5 characteres." }))
		return 1
	}
	return 0
}

function checkFormatPassword2(password, password2, errors, setErrors) {
	if (!password2 || password2.length < 1) {
		setErrors((errors) => ({ ...errors, password2: "Tu dois repeter le mot de passe." }))
		return 1
	}

	if (password !== password2) {
		setErrors((errors) => ({ ...errors, password2: "Les 2 mots de passes sont differents." }))
		return 1
	}
	return 0
}

function checkFormatCgu(cgu, errors, setErrors) {
	if (!cgu) {
		setErrors((errors) => ({
			...errors,
			cgu: (
				<>
					Tu dois <del>lire et</del> accepter les conditions generales d'utilisation.
				</>
			),
		}))
		return 1
	}
	return 0
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export function validateFormUserEdit(user, errors, setErrors) {
	let errorCount = 0

	errorCount += checkFormatUsername(user.username, errors, setErrors)
	errorCount += checkFormatFirstName(user.firstname, errors, setErrors)
	errorCount += checkFormatLastName(user.lastname, errors, setErrors)
	errorCount += checkFormatBirthday(user.birthday, errors, setErrors)
	errorCount += checkFormatGender(user.gender, errors, setErrors)
	errorCount += checkFormatLove(user.loveM, user.loveF, user.loveNB, errors, setErrors)

	// errorCount += checkFormatEmail(user.email, errors, setErrors)
	// errorCount += checkFormatPassword(user.password, errors, setErrors)
	// errorCount += checkFormatPassword2(user.password,user. password2, errors, setErrors)
	// errorCount += checkFormatCgu(user.cgu, errors, setErrors)

	return errorCount
}

export function validateFormUserRegistration(user, errors, setErrors) {
	let errorCount = 0

	errorCount += checkFormatUsername(user.username, errors, setErrors)
	errorCount += checkFormatEmail(user.email, errors, setErrors)
	errorCount += checkFormatFirstName(user.firstname, errors, setErrors)
	errorCount += checkFormatLastName(user.lastname, errors, setErrors)
	errorCount += checkFormatBirthday(user.birthday, errors, setErrors)
	errorCount += checkFormatPassword(user.password, errors, setErrors)
	errorCount += checkFormatPassword2(user.password, user.password2, errors, setErrors)
	errorCount += checkFormatGender(user.gender, errors, setErrors)
	errorCount += checkFormatLove(user.loveM, user.loveF, user.loveNB, errors, setErrors)
	errorCount += checkFormatCgu(user.cgu, errors, setErrors)

	console.log("errorCount", errorCount)

	return errorCount
}

export function validateFormLogin(emailOrUsername, password, errors, setErrors) {
	let errorCount = 0

	errorCount += checkFormatEmailOrUsername(emailOrUsername, errors, setErrors)
	errorCount += checkFormatPassword(password, errors, setErrors)

	return errorCount
}

export function validateFormResetPasswordAsk(email, errors, setErrors) {
	return checkFormatEmail(email, errors, setErrors)
}

export function validateFormPasswordResetUpdate(user, errors, setErrors) {
	let errorCount = 0

	errorCount += checkFormatEmail(user.email, errors, setErrors)
	errorCount += checkFormatPassword(user.password, errors, setErrors)
	errorCount += checkFormatPassword2(user.password, user.password2, errors, setErrors)

	return errorCount
}

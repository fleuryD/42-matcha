// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetch from "../utils/zFetch"
import zxFetch from "../utils/zxFetch"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// * ■■■■■■■■■■■■■■■■■■■■■ AUTH

export async function apiFetchRegister({
	username,
	email,
	password,
	firstname,
	lastname,
	birthday,
	gender,
	loveM,
	loveF,
	loveNB,
	biography,
}) {
	return zFetch({
		shortUrl: "/auth/register",
		method: "POST",
		body: {
			username,
			email,
			password,
			firstname,
			lastname,
			birthday,
			gender,
			loveM,
			loveF,
			loveNB,
			biography,
		},
		requierdFields: [],
		publicAccess: 1,
	})
}

export async function apiFetchLogin({ emailOrUsername, email, password }) {
	return zFetch({
		shortUrl: "/auth/login",
		method: "POST",
		body: {
			emailOrUsername,
			password,
		},
		requierdFields: [],
		publicAccess: 1,
	})
}

export async function apiFetchCheckEmail({ emailToken }) {
	return zFetch({
		shortUrl: "/auth/check-email",
		method: "POST",
		body: {
			emailToken,
		},
		requierdFields: [],
		publicAccess: 1,
	})
}

// DEBUG ONLY
export async function apiFetchDebugQuickLoginLogin({ username, superPassword }) {
	return zFetch({
		shortUrl: "/auth/dev/quick-login",
		method: "POST",
		body: {
			emailOrUsername: username,
			superPassword,
		},
		requierdFields: [],
		publicAccess: 1,
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■

/**
 * @usedIn 	PageAuthPasswordResetAsk
 */
export async function apiPasswordResetAsk(email) {
	return zxFetch({
		shortUrl: "/auth/password/reset/ask",
		method: "POST",
		body: { email },
	})
}

/**
 * @usedIn 	PageAuthPasswordUpdate
 */
export async function apiPasswordResetUpdate(user) {
	return zxFetch({
		shortUrl: "/auth/password/reset/update",
		method: "POST",
		body: { email: user.email, password: user.password, passwordResetToken: user.passwordResetToken },
	})
}

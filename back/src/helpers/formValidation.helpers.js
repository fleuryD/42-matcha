// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

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

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

function failIfInvalidFormatUsername(username) {
	if (!isValidFormatUsername(username)) throw new Error("ERROR_INVALID_USERNAME_FORMAT")
	return true
}

function failIfInvalidFormatEmail(email) {
	if (!isValidFormatEmail(email)) throw new Error("ERROR_INVALID_EMAIL_FORMAT")
	return true
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

function failIfUserInvalidForRegister(user) {
	failIfInvalidFormatUsername(user.username)
	failIfInvalidFormatEmail(user.email)

	if (!isValidFormatNames(user.firstname)) throw new Error("INVALID_FORMAT_FIRSTNAME")
	if (!isValidFormatNames(user.lastname)) throw new Error("INVALID_FORMAT_XXXXX")
}

function failIfUserInvalidForUpdate(user) {
	failIfInvalidFormatUsername()
	//failIfInvalidFormatEmail(user.email)
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	failIfUserInvalidForRegister,
	failIfUserInvalidForUpdate,

	failIfInvalidFormatUsername,
	failIfInvalidFormatEmail,
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

function generateRandomString(length, specialChars = true) {
	const characters = specialChars
		? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.+!*'(),"
		: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	let result = ""
	const charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}

	return result
}

function generateRandomBirthday(minYear, maxYear) {
	// Generate a random year within the range
	const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear

	// Generate a random month (from 0 to 11)
	const randomMonth = Math.floor(Math.random() * 12)

	// Generate a random day (from 1 to 28, as an example)
	const randomDay = Math.floor(Math.random() * 28) + 1

	// Create a new Date object with the random components
	const randomDate = new Date(randomYear, randomMonth, randomDay)

	// Format the date as desired (e.g., "YYYY-MM-DD")
	const formattedDate = randomDate.toISOString().split("T")[0]

	return formattedDate
}

function failIfUndefinedIds(functionName, id1, id2) {
	if (!id1 || !id2) {
		logError(functionName, `id1=${id1},  id2=${id2}`)
		throw new Error("UNDEFINED_ID")
	}
}
function failIfUndefinedId(functionName, id1) {
	if (!id1) {
		logError(functionName, `id1=${id1}`)
		throw new Error("UNDEFINED_ID")
	}
}

module.exports = {
	generateRandomString,
	generateRandomBirthday,
	failIfUndefinedIds,
	failIfUndefinedId,
}

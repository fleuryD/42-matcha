// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const { failIfUndefinedIds } = require("../helpers/helper")

const { getTags, addTagToUser, removeTagFromUser } = require("../repositories/tags.repository")

// *** ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const { userExistsBy } = require("../repositories/users.find.repository")

const {
	ERROR_INVALID_USERNAME_FORMAT,
	ERROR_EMAIL_NOT_FOUND,
	ERROR_EMAIL_ALREADY_EXISTS,
	ERROR_INVALID_EMAIL_FORMAT,
	ERROR_USER_NOT_FOUND,
} = require("../data/constants")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	addTagToUserOrFail,
	removeTagFromUserOrFail,
}

// *****************************************************************************

// *****************************************************************************
/**
 *	@description
 *		- Like a user, given the IDs of the sender and target users.
 *		- This function ensures that users cannot like themselves and checks if
 *		the target user exists and hasn't already been liked by the sender.
 *
 *
 *	@param	{Object} o
 *		@param	{number} o.tagId : id of the
 *		@param	{number} o.userId : id of the user.
 *
 *
 *	@returns
 *
 *
 *	@throws {Error} "UNDEFINED_ID"
 *		- Thrown if the tagId or the userId is undefined.
 *	@throws {Error} "USER_NOT_FOUND")
 *		- Thrown if the user targetId is not found.
 *	@throws {Error} "TAG_ALREADY_ADDED")
 *		- Thrown if there is already an existing tag record for the specified
 *		tagId and userId.
 *
 */
async function addTagToUserOrFail({ tagId, userId }) {
	failIfUndefinedIds("removeTagFromUserOrFail", tagId, userId)

	if (!(await userExistsBy("id", userId))) throw new Error(ERROR_USER_NOT_FOUND)

	const existingTags = await getTags({ tagId, userId })
	if (existingTags.length > 0) throw new Error("TAG_ALREADY_ADDED")

	const newTagUser = await addTagToUser({ tagId, userId })

	return newTagUser
}
// *****************************************************************************

async function removeTagFromUserOrFail({ tagId, userId }) {
	failIfUndefinedIds("removeTagFromUserOrFail", tagId, userId)

	const existingTags = await getTags({ tagId, userId })
	if (existingTags.length == 0) throw new Error("TAG_WAS_NOT_ADDED")

	await removeTagFromUser({ tagId, userId })

	return { success: 1 }
}

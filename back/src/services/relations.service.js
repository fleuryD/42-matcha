// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")

const {
	createLike,
	deleteLike,
	getLikes,
	createBlock,
	deleteBlock,
	getBlocks,
	createFake,
	deleteFake,
	getFakes,
} = require("../repositories/relations.repository")

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

/*
 *	Service pour les LIKE/BLOCK/FAKE
 *
 */

module.exports = {
	likeUserOrFail,
	unlikeUserOrFail,

	blockUserOrFail,
	unblockUserOrFail,

	fakeUserOrFail,
	unfakeUserOrFail,
}

// *****************************************************************************

/**
 *	@functions likeUserOrFail, blockUserOrFail, fakeUserOrFail
 *
 *	@description
 *		- Like/Blocks/Fakes a user, given the IDs of the sender and target users.
 *		- This functions ensure that users cannot Like/Block/Fake themselves
 *		and checks if the target user exists and hasn't already been
 *		Liked/Blocked/Faked by the sender.
 *
 *
 *	@param	{Object} o
 *		@param	{number} o.senderId : id of the user initiating the  action.
 *		@param	{number} o.targetId : id of the other user.
 *
 *
 *	@returns {Object}:
 *		{
 *			id: number,
 *			sender_id: number,
 *			target_id: number,
 *			created_at: Date // ??????????????????????????
 *		}
 *
 *
 *	@throws {Error} "UNDEFINED_SENDER_ID" | "UNDEFINED_TARGET_ID"
 *		- Thrown if the senderId or the targetId is undefined.

 *	@throws {Error} "CANT_LIKE_YOURSELF" | "CANT_BLOCK_YOURSELF" | CANT_FAKE_YOURSELF
 *		- Thrown if the senderId is the same as the targetId

 *	@throws {Error} "USER_NOT_FOUND")
 *		- Thrown if the user targetId is not found.

 *	@throws {Error} "USER_ALREADY_LIKED" | "USER_ALREADY_BLOCKED" | "USER_ALREADY_FAKED")
 *		- Thrown if there is already an existing Like/Block/Fake record for the
 *		specified sender and target users.
 *
 */

async function likeUserOrFail({ senderId, targetId }) {
	if (!senderId) throw new Error("UNDEFINED_SENDER_ID")
	if (!targetId) throw new Error("UNDEFINED_TARGET_ID")
	if (senderId === targetId) throw new Error("CANT_LIKE_YOURSELF")
	if (!(await userExistsBy("id", targetId))) throw new Error(ERROR_USER_NOT_FOUND)
	if ((await getLikes({ senderId, targetId })).length > 0) throw new Error("USER_ALREADY_LIKED")

	const newLike = await createLike({ senderId, targetId })
	return newLike
}

async function blockUserOrFail({ senderId, targetId }) {
	if (!senderId) throw new Error("UNDEFINED_SENDER_ID")
	if (!targetId) throw new Error("UNDEFINED_TARGET_ID")
	if (senderId === targetId) throw new Error("CANT_BLOCK_YOURSELF")
	if (!(await userExistsBy("id", targetId))) throw new Error(ERROR_USER_NOT_FOUND)
	const existingBlocks = await getBlocks({ senderId, targetId })
	if (existingBlocks.length > 0) throw new Error("USER_ALREADY_BLOCKED")

	const newBlock = await createBlock({ senderId, targetId })
	return newBlock
}

async function fakeUserOrFail({ senderId, targetId }) {
	if (!senderId) throw new Error("UNDEFINED_SENDER_ID")
	if (!targetId) throw new Error("UNDEFINED_TARGET_ID")
	if (senderId === targetId) throw new Error("CANT_FAKE_YOURSELF")
	if (!(await userExistsBy("id", targetId))) throw new Error(ERROR_USER_NOT_FOUND)
	const existingFakes = await getFakes({ senderId, targetId })
	if (existingFakes.length > 0) throw new Error("USER_ALREADY_FAKED")

	const newFake = await createFake({ senderId, targetId })
	return newFake
}

// *****************************************************************************
/**
 *	@description
 *		- Un-Like/Blocks/Fakes a user, given the IDs of the sender and target users.
 *		- This functions ensures that the target user is Liked/Blocked/Faked by the sender.
 *
 *
 *	@param	{Object} o
 *		@param	{number} o.senderId : id of the user initiating the action.
 *		@param	{number} o.targetId : id of the other .
 *
 *
 *	@returns	{Promise<Object>} :	{ success: 1 }
 *
 *
 *	@throws {Error} "UNDEFINED_ID"
 *		- Thrown if the senderId or the targetId is undefined.
 *	@throws {Error} "USER_WAS_NOT_BLOCKED":
 *		- Thrown if the target wasn't blocked by the sender
 *
 */

async function unlikeUserOrFail({ senderId, targetId }) {
	if (!senderId) throw new Error("UNDEFINED_SENDER_ID")
	if (!targetId) throw new Error("UNDEFINED_TARGET_ID")
	if ((await getLikes({ senderId, targetId })).length == 0) throw new Error("USER_WAS_NOT_LIKED")

	await deleteLike({ senderId, targetId })
	return { success: 1 }
}

async function unblockUserOrFail({ senderId, targetId }) {
	if (!senderId) throw new Error("UNDEFINED_SENDER_ID")
	if (!targetId) throw new Error("UNDEFINED_TARGET_ID")
	if ((await getBlocks({ senderId, targetId })).length == 0) throw new Error("USER_WAS_NOT_BLOCKED")

	await deleteBlock({ senderId, targetId })
	return { success: 1 }
}

async function unfakeUserOrFail({ senderId, targetId }) {
	if (!senderId) throw new Error("UNDEFINED_SENDER_ID")
	if (!targetId) throw new Error("UNDEFINED_TARGET_ID")
	if ((await getFakes({ senderId, targetId })).length == 0) throw new Error("USER_WAS_NOT_FAKED")

	await deleteFake({ senderId, targetId })
	return { success: 1 }
}

// *****************************************************************************

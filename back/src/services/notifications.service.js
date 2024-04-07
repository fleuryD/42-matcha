// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const { logError, failIfUndefinedIds, failIfUndefinedId } = require("../helpers/helper")

const { deleteOldsAndCreateVisitOrFail } = require("../services/visits.service")
const { createNotification } = require("../repositories/notifications.repository")
const { areUsersBlocking } = require("../repositories/relations.repository")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	createAndSendNotificationService,
}

// *****************************************************************************

async function createAndSendNotificationService({
	targetId,
	senderId,
	senderUsername,
	senderPicture1 = null,
	genre,
	message = null,
	io = null,
}) {
	if (!targetId) throw new Error("INTERNAL_ERROR_CREATE_AND_SEND_NOTIFICATION_UNDEFINED_TARGET_ID")
	if (!senderId) throw new Error("INTERNAL_ERROR_CREATE_AND_SEND_NOTIFICATION_UNDEFINED_SENDER_ID")
	if (!senderUsername) throw new Error("INTERNAL_ERROR_CREATE_AND_SEND_NOTIFICATION_UNDEFINED_SENDER_USERNAME")
	if (!genre) throw new Error("INTERNAL_ERROR_CREATE_AND_SEND_NOTIFICATION_UNDEFINED_GENRE")

	const genres = ["LIKE", "UNLIKE", "MESSAGE", "VISIT"]
	if (!genres.includes(genre)) throw new Error("INTERNAL_ERROR_CREATE_AND_SEND_NOTIFICATION_UNKNOWN_GENRE")

	if (await areUsersBlocking(senderId, targetId)) return 0

	if (genre === "VISIT") {
		await deleteOldsAndCreateVisitOrFail({ senderId, targetId })
	}

	let notification = await createNotification({ targetId, senderId, genre }) // senderUsername
	notification = { ...notification, sender_username: senderUsername, sender_picture_1: senderPicture1 }
	if (genre === "MESSAGE") {
		notification = { ...notification, message }
	}

	/*
	{
		created_at: "2024-03-01T13:35:54.494Z"​​​,
		genre: "VISIT"​​​,
		id: 25​​​,
		is_read: 0,​​​
		sender_id: 135​​​,
		sender_picture_1: "indiana-1.jpg"​​​,
		sender_username: "Indiana"​​​,
		target_id: 133,
	}

	*/
	io.emit("subscribe_4_user_" + targetId, notification)

	return 1
}

// *****************************************************************************

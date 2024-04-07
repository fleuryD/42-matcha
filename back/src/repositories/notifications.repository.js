// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const db = require("../data/pg")

const { failIfUndefinedIds, failIfUndefinedId } = require("../helpers/helper")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

/*
 *	@table:	`notifications`
 *
 *	@desc:	when a user (sender) notifications the profile of another user (target)
 *
 *
 */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	createNotification,
	deleteNotifications,
	selectNotificationsByTargetId,
	deleteNotificationsByTargetId,
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function createNotification({ targetId, senderId, genre }) {
	failIfUndefinedIds("createNotification", senderId, targetId)
	if (!genre || !["LIKE", "UNLIKE", "VISIT", "MESSAGE"].includes(genre)) {
		console.error("createNotification::NOTIFICATION_GENRE_UNKNOWN:", genre)
		throw new Error("NOTIFICATION_GENRE_UNKNOWN")
	}
	const insertQuery = `INSERT INTO notifications (sender_id, target_id, genre) VALUES($1, $2, $3) RETURNING *;`
	const values = [senderId, targetId, genre]
	const data = await db.query(insertQuery, values)

	return data.rows[0]
}

async function deleteNotifications({ senderId, targetId }) {
	failIfUndefinedIds("deleteNotifications", senderId, targetId)
	const query = "DELETE FROM notifications WHERE sender_id = $1 AND target_id =  $2;"
	const values = [senderId, targetId]
	await db.query(query, values)
	return { success: 1 }
}
async function deleteNotificationsByTargetId({ targetId }) {
	failIfUndefinedId("deleteNotificationsByTargetId", targetId)
	const query = "DELETE FROM notifications WHERE target_id =  $1;"
	const values = [targetId]
	await db.query(query, values)
	return { success: 1 }
}

async function selectNotificationsByTargetId(targetId) {
	//const query = "SELECT * FROM notifications WHERE (target_id=$1) ;"

	const query = `SELECT
			notifications.*,
			sender.username AS sender_username,
			sender.picture_1 AS sender_picture_1
		FROM
			notifications
		JOIN
			users AS sender ON notifications.sender_id = sender.id
		WHERE
			target_id = $1;`

	const values = [targetId]
	const data = await db.query(query, values)
	return data.rows
}

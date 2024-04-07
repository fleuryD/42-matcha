// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const db = require("../data/pg")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function createMessage({ senderId, targetId, content }) {
	const query = "INSERT INTO messages (sender_id, target_id, content)  VALUES($1, $2, $3) RETURNING *;"
	const values = [senderId, targetId, content]
	const data = await db.query(query, values)
	return data.rows[0]
}
async function getMessagesByUsers(user1Id, user2Id) {
	const query = `SELECT * FROM messages
		WHERE (sender_id=$1 AND target_id=$2)
		OR    (sender_id=$2 AND target_id=$1);`

	const values = [user1Id, user2Id]
	const data = await db.query(query, values)
	return data.rows
}

module.exports = {
	createMessage,
	getMessagesByUsers,
}

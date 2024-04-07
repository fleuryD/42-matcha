// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const db = require("../data/pg")

const { failIfUndefinedIds, failIfUndefinedId } = require("../helpers/helper")
const { logError } = require("../helpers/logs.helper")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

/*
 *	@table:	`visits`
 *
 *	@desc:	when a user (sender) visits the profile of another user (target)
 *
 *
 */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	createVisit,
	deleteVisits,
	updateVisitById,
	getVisits,
	getVisitsByUserId,
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function createVisit({ senderId, targetId }) {
	failIfUndefinedIds("createVisit", senderId, targetId)
	const query = "INSERT INTO visits (sender_id, target_id) VALUES($1, $2) RETURNING *;"
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function deleteVisits({ senderId, targetId }) {
	failIfUndefinedIds("deleteVisits", senderId, targetId)
	const query = "DELETE FROM visits WHERE sender_id = $1 AND target_id =  $2;"
	const values = [senderId, targetId]
	await db.query(query, values)
	return { success: 1 }
}

async function updateVisitById(visitId) {
	failIfUndefinedId("updateVisitById", visitId)
	const query = "UPDATE visits SET created_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;"
	const values = [visitId]
	await db.query(query, values)
	return { success: 1 }
}

async function getVisits({ senderId, targetId }) {
	failIfUndefinedIds("getBlocks", senderId, targetId)
	const query = `SELECT * FROM visits WHERE (sender_id=$1 AND target_id=$2);`
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows
}

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

async function getVisitsByUserId(userId) {
	try {
		//const query = "SELECT * FROM visits WHERE (sender_id=$1 OR target_id=$1) ;"

		const query = `SELECT
			visits.*,
			sender.username AS sender_username,
			target.username AS target_username
		FROM
			visits
		JOIN
			users AS sender ON visits.sender_id = sender.id
		JOIN
			users AS target ON visits.target_id = target.id
		WHERE
			sender_id = $1 OR target_id = $1;`

		const values = [userId]
		const data = await db.query(query, values)
		return data.rows
	} catch (error) {
		logError("getVisitsByUserId", error)
		return { users: null, error: error }
	}
}

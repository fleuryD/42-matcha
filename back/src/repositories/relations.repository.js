// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const db = require("../data/pg")

const { failIfUndefinedIds } = require("../helpers/helper")
const { logError } = require("../helpers/logs.helper")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	createLike,
	getLikedUsers,
	getLikerUsers,
	deleteLike,
	getLikes,
	areUsersMatching,
	areUsersBlocking,

	createBlock,
	deleteBlock,
	getBlocks,
	getBlocksBySenderId,
	getBlocksByTargetId,

	createFake,
	deleteFake,
	getFakes,
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function createLike({ senderId, targetId }) {
	failIfUndefinedIds("createLike", senderId, targetId)
	const query = "INSERT INTO likes (sender_id, target_id)  VALUES($1, $2) RETURNING *;"
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function createBlock({ senderId, targetId }) {
	failIfUndefinedIds("createBlock", senderId, targetId)
	const query = "INSERT INTO blocks (sender_id, target_id)  VALUES($1, $2) RETURNING *;"
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function createFake({ senderId, targetId }) {
	failIfUndefinedIds("createFake", senderId, targetId)
	const query = "INSERT INTO fakes (sender_id, target_id)  VALUES($1, $2) RETURNING *;"
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows[0]
}

// *****************************************************************************

async function deleteLike({ senderId, targetId }) {
	failIfUndefinedIds("deleteLike", senderId, targetId)
	const query = "DELETE FROM likes WHERE (sender_id=$1 AND target_id=$2);"
	const values = [senderId, targetId]
	await db.query(query, values)
	return { success: 1 }
}
async function deleteBlock({ senderId, targetId }) {
	failIfUndefinedIds("deleteBlock", senderId, targetId)
	const query = "DELETE FROM blocks WHERE (sender_id=$1 AND target_id=$2);"
	const values = [senderId, targetId]
	await db.query(query, values)
	return { success: 1 }
}

async function deleteFake({ senderId, targetId }) {
	failIfUndefinedIds("deleteFake", senderId, targetId)
	const query = "DELETE FROM fakes WHERE (sender_id=$1 AND target_id=$2);"
	const values = [senderId, targetId]
	await db.query(query, values)
	return { success: 1 }
}

// *****************************************************************************

async function getLikes({ senderId, targetId }) {
	failIfUndefinedIds("getLikes", senderId, targetId)
	const query = `SELECT * FROM likes WHERE (sender_id=$1 AND target_id=$2);`
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows
}

async function getBlocks({ senderId, targetId }) {
	failIfUndefinedIds("getBlocks", senderId, targetId)
	const query = `SELECT * FROM blocks WHERE (sender_id=$1 AND target_id=$2);`
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows
}

async function getFakes({ senderId, targetId }) {
	failIfUndefinedIds("getFakes", senderId, targetId)
	const query = `SELECT * FROM fakes WHERE (sender_id=$1 AND target_id=$2);`
	const values = [senderId, targetId]
	const data = await db.query(query, values)
	return data.rows
}

// *****************************************************************************

// renvoie true si il y a un match
async function areUsersMatching(user1Id, user2Id) {
	const query = `
        SELECT COUNT(*) > 0 AS matching
        FROM likes l1
        JOIN likes l2 ON l1.sender_id = l2.target_id AND l1.target_id = l2.sender_id
        WHERE l1.sender_id = $1 AND l2.sender_id = $2;
    `
	const values = [user1Id, user2Id]
	const data = await db.query(query, values)
	return data.rows[0].matching ? true : false
}

// renvoie true si un des 2 user a bloque l'autre
async function areUsersBlocking(user1Id, user2Id) {
	const query = `
        SELECT EXISTS (
            SELECT 1
            FROM blocks b
            WHERE (b.sender_id = $1 AND b.target_id = $2)
               OR (b.sender_id = $2 AND b.target_id = $1)
        ) AS blocking;
    `
	const values = [user1Id, user2Id]
	const data = await db.query(query, values)
	return data.rows[0].blocking ? true : false
}

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

/*
 *	Get Users I like
 *
 */
async function getLikedUsers(senderId) {
	try {
		const query =
			"SELECT  users.id, users.username, users.picture_1 FROM likes RIGHT JOIN users ON likes.target_id = users.id WHERE (sender_id=$1) ;"
		const values = [senderId]
		const data = await db.query(query, values)
		return data.rows
	} catch (error) {
		logError("getLikedUsers", error)
		return { users: null, error: error }
	}
}

async function getBlocksBySenderId(senderId) {
	const query = `SELECT users.id, users.username, users.picture_1 FROM blocks WHERE sender_id=$1;`
	const values = [senderId]
	const data = await db.query(query, values)
	return data.rows
}

// *****************************************************************************

/*
 *	Get Users who like me
 *
 */
async function getLikerUsers(targetId) {
	try {
		const query =
			"SELECT users.id, users.username, users.picture_1 FROM likes RIGHT JOIN users ON likes.sender_id = users.id WHERE (target_id=$1) ;"
		const values = [targetId]
		const data = await db.query(query, values)
		return data.rows
	} catch (error) {
		logError("getLikerUsers", error)
		return { users: null, error: error }
	}
}

async function getBlocksByTargetId(targetId) {
	const query = `SELECT users.id, users.username, users.picture_1 FROM blocks WHERE target_id=$1;`
	const values = [targetId]
	const data = await db.query(query, values)
	return data.rows
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

var express = require("express")
const db = require("../data/pg")
const { logError } = require("../helpers/logs.helper")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function getTags({ tagId, userId }) {
	//failIfUndefinedIds("getLikes", senderId, targetId)
	const query = `SELECT * FROM tags_users WHERE (tag_id=$1 AND user_id=$2);`
	const values = [tagId, userId]
	const data = await db.query(query, values)
	return data.rows
}

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

async function createTag({ name, category }) {
	const query = "INSERT INTO tags (name, category)  VALUES($1, $2) RETURNING *;"
	const values = [name, category]
	const data = await db.query(query, values)
	return data.rows[0]
}

async function getAllTags() {
	try {
		const data = await db.query("SELECT * FROM tags;")
		return data.rows
	} catch (error) {
		logError("getTagsOfUser", error)
		return { users: null, error: error }
	}
}

async function getTagsOfUser(userId) {
	const query = `
SELECT *
FROM tags_users
RIGHT JOIN tags ON tags_users.tag_id = tags.id
WHERE (user_id=$1) ;
`
	const values = [userId]
	const data = await db.query(query, values)
	return data.rows
}
/*
async function countTagsOfUser(userId) {
	const query = `
SELECT tags.id, tags.name, COUNT(tags_users.tag_id) AS tag_count
FROM tags
LEFT JOIN tags_users ON tags.id = tags_users.tag_id
WHERE tags_users.user_id = $1
GROUP BY tags.id, tags.name;
`
	const values = [userId]
	const data = await db.query(query, values)
	return data.rows
}
*/

async function addTagToUser({ tagId, userId }) {
	try {
		const query = "INSERT INTO tags_users (tag_id, user_id)  VALUES($1, $2) RETURNING *;"
		const values = [tagId, userId]
		const data = await db.query(query, values)
		return data.rows[0]
	} catch (error) {
		logError("addTagToUser", error)
		return null
	}
}

async function removeTagFromUser({ tagId, userId }) {
	const query = "DELETE FROM tags_users WHERE (tag_id=$1 AND user_id=$2);"
	const values = [tagId, userId]

	try {
		const data = await db.query(query, values)
		return { success: 1 }
	} catch (error) {
		logError("removeTagFromUser", error)
		return null
	}
}

module.exports = {
	createTag,
	getAllTags,
	getTagsOfUser,
	addTagToUser,
	removeTagFromUser,
	getTags,
}

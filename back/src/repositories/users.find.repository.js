// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const express = require("express")
const db = require("../data/pg")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = {
	findUserOrNullBy,
	userExistsBy,
	findUsers,
}

// *◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function findUsers() {
	const query = "SELECT * FROM users;"
	const data = await db.query(query)
	const users = data.rows
	return users
}

async function findUserOrNullBy(key, val, selectList = " * ") {
	let query = `SELECT \n    `
	query += selectList
	query += `\n FROM users u \n `

	query += `WHERE  \n`
	if (key === "emailOrUsername") {
		query += ` (email=$1 OR username=$1)  `
	} else {
		query += ` ${key}=$1  `
	}

	//	const query = `SELECT ${select_list_for_login} FROM users u ${sqlFameCalcJoin} WHERE (email=$1 OR username=$1) GROUP BY  u.id;;`

	const data = await db.query(query, [val])
	const user = data.rows[0] || null
	// if (!user) throw new Error("USER_NOT_FOUND")
	return user
}

async function userExistsBy(pty, val) {
	///// if (!isValidUserPty(pty)) throw new Error("INVALID_PROPERTY_" + pty)

	if (pty === "emailOrUsername") {
		const users = await db.query(`SELECT id FROM users WHERE (email=$1 OR username=$1) ;`, [val])
		return users.rows.length > 0
	}

	const users = await db.query(`SELECT id FROM users WHERE ${pty}=$1 ;`, [val])
	return users.rows.length > 0
}

// *◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

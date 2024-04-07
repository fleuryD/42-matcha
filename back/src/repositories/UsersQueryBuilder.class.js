// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const express = require("express")
const db = require("../data/pg")

//!! GIT_KEEP:  :  use CONST coef
const { COEF_LIKED, COEF_VISITED, COEF_BLOCKED, COEF_FAKED } = require("../data/constants")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

function isValidUserPty(pty) {
	return [
		"id",
		"email",
		"username",
		"password",
		"birthday",
		"lastname",
		"firstname",
		"biography",
		"gender",
		"love_m",
		"love_f",
		"love_nb",
		"access_token",
		"created_at",
		"email_token",
		"email_reset_value",
		"email_reset_token",
		"email_reset_at",
		"password_reset_token",
		"password_reset_at",
		"last_connection_at",
		"is_online",
		"picture_1",
		"picture_2",
		"picture_3",
		"picture_4",
		"picture_5",
		"latitude",
		"longitude",
		"city",
		"country",
		"postal_code",
	].includes(pty)
}

class QueryBuilder {
	constructor({
		select = ["id"],
		leftJoins = [],
		where = [],
		groupBy = [],
		having = [],

		orderBy = "id",
		orderReverse = false,
		limit = null,
		offset = null,
	}) {
		this.select = select
		this.leftJoins = leftJoins
		this.where = where
		this.groupBy = groupBy
		this.having = having

		this.orderBy = orderBy
		this.orderReverse = orderReverse

		this.limit = limit
		this.offset = offset
	}

	addSelect(val) {
		this.select.push(val)
	}
	addLeftJoins(val) {
		this.leftJoins.push(val)
	}
	addWhere(val) {
		this.where.push(val)
	}
	addGroupBy(val) {
		this.groupBy.push(val)
	}
	addHaving(val) {
		this.having.push(val)
	}
}

class UsersQueryBuilder extends QueryBuilder {
	constructor({
		select = ["id"],
		leftJoins = [],
		where = [],
		groupBy = [],
		having = [],
		orderBy = "username",
		orderReverse = false,
		limit = null,
		offset = null,

		connectedUser = null,

		includeCommonTagsCount = false,
		includeUserTags = false,
		includeRelationsCounts = false,
		includeRelationsWithConnectedUser = false,
		excludeBlockedUsers = false,
		excludeConnectedUser = false,

		filters = null,
	}) {
		super({
			select,
			leftJoins,
			where,
			groupBy,
			having,
			orderBy,
			orderReverse,
			limit,
			offset,
		})
		this.connectedUser = connectedUser

		this.includeCommonTagsCount = includeCommonTagsCount
		this.includeUserTags = includeUserTags

		this.includeRelationsCounts = includeRelationsCounts // count_liked, count_blocked, count_visited, count_fakednectedUser = true // blockedbyme, blockesme, likedbyme, likesme
		this.includeRelationsWithConnectedUser = includeRelationsWithConnectedUser // blockedbyme, blockesme, likedbyme, likesme

		this.excludeBlockedUsers = excludeBlockedUsers
		this.excludeConnectedUser = excludeConnectedUser

		this.filters = filters

		this.initQuery()
	}

	getQueryCalcDistanceKm(connectedUser) {
		// Utilise la Formule de Haversine pour calculer la distance en KM.
		const lat1 = connectedUser?.latitude || 42.6982764
		const lon1 = connectedUser?.longitude || 2.8875227
		return `( 6371 * acos(cos(radians(${lat1})) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(${lon1})) + sin(radians(${lat1})) * sin(radians(u.latitude))) )`
	}

	getQueryCalcFame() {
		return `( COUNT(DISTINCT l.id) * ${COEF_LIKED} +  COUNT(DISTINCT b.id) * ${COEF_BLOCKED} +  COUNT(DISTINCT v.id) * ${COEF_VISITED} +  COUNT(DISTINCT f.id) * ${COEF_FAKED} )`
	}

	getQueryCalcCommonTagsCounts(connectedUser) {
		return `(
			SELECT COUNT(*)
			FROM tags_users ut
			JOIN tags t ON ut.tag_id = t.id
			WHERE ut.user_id = u.id
			AND t.id IN (
						SELECT ut2.tag_id
						FROM tags_users ut2
						WHERE ut2.user_id = ${connectedUser.id}
			)
		)`
	}

	initQuery() {
		this.addGroupBy("u.id")
		this.addGroupBy("u.username")

		if (this.select.includes("age")) {
			this.addSelect(`DATE_PART('year', AGE(u.birthday)) AS age`)
		}
		if (this.select.includes("fame")) {
			this.addSelect(`${this.getQueryCalcFame()} AS fame `)
		}
		if (this.select.includes("fame") || this.filters?.fameMin || this.filters?.fameMax) {
			this.addLeftJoins(`likes  l ON u.id = l.target_id`)
			this.addLeftJoins(`blocks b ON u.id = b.target_id`)
			this.addLeftJoins(`visits v ON u.id = v.target_id`)
			this.addLeftJoins(`fakes  f ON u.id = f.target_id`)
		}

		if (this.includeRelationsCounts) {
			this.addSelect(`COUNT(DISTINCT l.id) AS count_liked`)
			this.addSelect(`COUNT(DISTINCT b.id) AS count_blocked`)
			this.addSelect(`COUNT(DISTINCT v.id) AS count_visited`)
			this.addSelect(`COUNT(DISTINCT f.id) AS count_faked`)
		}

		if (this.includeUserTags) {
			this.addSelect(`ARRAY_AGG(DISTINCT t.name) AS tags`)

			this.addLeftJoins(`(
					SELECT tu.user_id, t.name FROM tags_users tu
					JOIN tags t ON tu.tag_id = t.id
				) t ON u.id = t.user_id`)
		}

		if (this.connectedUser) {
			if (this.select.includes("distance") && this.connectedUser?.latitude && this.connectedUser?.longitude) {
				this.addSelect(`${this.getQueryCalcDistanceKm(this.connectedUser)} AS distance`)
			}

			if (this.includeRelationsWithConnectedUser || this.excludeBlockedUsers) {
				this.addSelect(`CASE WHEN blockedbyme.id IS NOT NULL THEN true ELSE false END AS is_blocked`)
				this.addSelect(`CASE WHEN blockesme.id   IS NOT NULL THEN true ELSE false END AS is_blockes_me`)
				this.addLeftJoins(
					`blocks blockedbyme ON u.id = blockedbyme.target_id AND blockedbyme.sender_id = ${this.connectedUser.id}`
				)
				this.addLeftJoins(
					`blocks blockesme   ON u.id = blockesme.sender_id   AND blockesme.target_id   = ${this.connectedUser.id}`
				)
				if (this.excludeBlockedUsers) {
					this.addWhere("blockedbyme.id IS NULL")
					this.addWhere("blockesme.id IS NULL")
				}
				this.addGroupBy("blockedbyme.id")
				this.addGroupBy("blockesme.id")
			}

			if (this.includeRelationsWithConnectedUser) {
				this.addSelect(
					`CASE WHEN likedbyme.sender_id =  ${this.connectedUser.id} THEN true ELSE false END AS is_liked_by_me`
				)
				this.addSelect(
					`CASE WHEN likesme.target_id   =  ${this.connectedUser.id} THEN true ELSE false END AS is_likes_me`
				)
				this.addLeftJoins(
					`likes  likedbyme   ON u.id = likedbyme.target_id   AND likedbyme.sender_id   = ${this.connectedUser.id}`
				)
				this.addLeftJoins(
					`likes  likesme	 ON u.id = likesme.sender_id	 AND likesme.target_id	 = ${this.connectedUser.id}`
				)
				this.addGroupBy("likedbyme.sender_id")
				this.addGroupBy("likesme.target_id")
			}

			if (this.includeCommonTagsCount)
				this.addSelect(`${this.getQueryCalcCommonTagsCounts(this.connectedUser)}  AS common_tags_count`)

			if (this.excludeConnectedUser) this.addWhere(`u.id <>  ${this.connectedUser.id}`)
		}

		if (this.filters) {
			// *** filters: gender
			if (this.filters.genderM || this.filters.genderF || this.filters.genderNB) {
				if (!this.filters.genderM) this.addWhere("u.gender <> 'M'")
				if (!this.filters.genderF) this.addWhere("u.gender <> 'F'")
				if (!this.filters.genderNB) this.addWhere("u.gender <> 'NB'")
			}

			// *** filters: loves
			if (this.filters.loveM) this.addWhere("u.love_m = true")
			if (this.filters.loveF) this.addWhere("u.love_f = true")
			if (this.filters.loveNB) this.addWhere("u.love_nb = true")

			// *** filters: age
			if (this.filters.ageMin) this.addWhere(`AGE(u.birthday) >= INTERVAL '${this.filters.ageMin} years'`)
			if (this.filters.ageMax)
				this.addWhere(`AGE(u.birthday) <= INTERVAL '${parseInt(this.filters.ageMax, 10) + 1} years'`)

			if (this.filters.fameMin) this.addHaving(`${this.getQueryCalcFame()} >= ${this.filters.fameMin} `)
			if (this.filters.fameMax) this.addHaving(`${this.getQueryCalcFame()} <= ${this.filters.fameMax} `)

			if (this.connectedUser) {
				// *** filters: commonTagsCount
				if (this.filters.commonTagsCount && this.filters.commonTagsCount > 0)
					this.addWhere(
						`${this.getQueryCalcCommonTagsCounts(this.connectedUser)} >= ${this.filters.commonTagsCount}`
					)

				// *** filters: distance
				if (this.filters.distanceMax && this.filters.distanceMax > 0) {
					this.addHaving(
						`(${this.getQueryCalcDistanceKm(this.connectedUser)}  <= ${this.filters.distanceMax} )`
					)
					//this.addHaving(`(u.distance <= ${this.filters.distanceMax} )`)
					//this.addWhere(`(distance <= ${this.filters.distanceMax} )`)
				}
			}
		}
		// supprimer les "items calcule" de select
		this.select = this.select.filter((item) => !["age", "fame", "distance"].includes(item))
	}

	generateQuery({ command }) {
		let query = ``
		// #####################################		SELECT
		if (command === "SELECT") {
			query += `\n ${command}  \n`
			let selectCount = 0
			for (const selectPty of this.select) {
				if (selectCount > 0) query += `,`
				query += `\n	`
				if (!selectPty.includes(".") && !selectPty.includes(" ")) query += `u.`
				query += `${selectPty}`
				selectCount++
			}
		} else query += `\n ${command} \n`
		// #####################################	FROM AND LEFT JOIN
		query += `\n\n FROM users u \n\n`
		for (const lJoin of this.leftJoins) {
			query += `\n	LEFT JOIN ${lJoin}`
		}
		// #####################################	WHERE
		if (this.where.length > 0) {
			query += `\n\n WHERE \n`
			let whereCount = 0
			for (const where of this.where) {
				if (whereCount > 0) query += ` AND `
				query += `\n	${where}`
				whereCount++
			}
		}
		// #####################################	GROUP
		if (this.groupBy.length > 0) {
			query += `\n\n GROUP BY \n`
			let groupByCount = 0
			for (const group of this.groupBy) {
				if (groupByCount > 0) query += `,`
				query += `\n	${group}`
				groupByCount++
			}
		}
		// #####################################	HAVING
		if (this.having.length > 0) {
			query += `\n HAVING \n`
			let havingCount = 0
			for (const havg of this.having) {
				if (havingCount > 0) query += ` AND `
				query += `\n	${havg}`
				havingCount++
			}
		}
		// #####################################	ORDER
		//if (filters.orderBy === "common_tags_count" && connectedUser) query += `ORDER BY common_tags_count DESC, u.username;`
		//if (filters.orderBy === "fame") filters.orderBy = ` fame `

		let orderReverse = this.orderReverse
		if (this.orderBy === "fame" || this.orderBy === "common_tags_count") orderReverse = !orderReverse
		if (command !== "SELECT COUNT (*)") query += `\n\n ORDER BY ${this.orderBy} ${orderReverse ? "DESC" : ""} `
		if (this.orderBy !== "username") query += `, u.username `

		// #####################################	ORDER

		if (command !== "SELECT COUNT (*)" && this.limit !== null && this.offset !== null) {
			query += `\n\n LIMIT ${this.limit}  OFFSET ${this.offset} \n\n`
		}
		// #####################################
		query += `\n;`

		console.log(query)

		return query
	}

	async countUsers() {
		const query = this.generateQuery({ command: "SELECT COUNT (*)" })
		const data = await db.query(query)
		return data.rowCount
		//const users = data.rows
		//return users
	}

	async findUsers() {
		const query = this.generateQuery({ command: "SELECT" })
		const data = await db.query(query)
		const users = data.rows
		return users
	}

	async findUser() {
		const query = this.generateQuery({ command: "SELECT" })
		const data = await db.query(query)
		const user = data.rows[0] || null
		return user
	}

	async findUserOrFail() {
		const user = await this.findUser()
		if (!user) throw new Error("USER_NOT_FOUND")
		return user
	}
}

module.exports = {
	UsersQueryBuilder,
}

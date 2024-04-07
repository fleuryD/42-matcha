// http://www.cril.univ-artois.fr/~boussemart/express/chapter04.html

const { POOL_USER, POOL_HOST, POOL_DATABASE, POOL_PASSWORD, POOL_PORT } = require("./constants")

const { Pool } = require("pg")

const pool = new Pool({
	user: POOL_USER,
	host: POOL_HOST,
	database: POOL_DATABASE,
	password: POOL_PASSWORD,
	port: POOL_PORT,
})

pool.on("connect", (client) => {
	//console.log("connected to the db")
	client.query("SET search_path TO users")
})

module.exports = {
	query: (text, params) => {
		return pool.query(text, params)
	},
}

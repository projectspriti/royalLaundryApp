const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


async function query(query, params) {
	let result;
	let connection;

	try {
		connection = await pool.getConnection();
		[result] = await connection.execute(query, params);
	} catch (err) {
		console.error("Error executing query:", err.message);
		throw err; // Re-throw the error after logging it
	} finally {
		if (connection) connection.release();
	}

	return result;
}

module.exports = { query };

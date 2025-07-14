// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// });


// async function query(query, params) {
// 	let result;
// 	let connection;

// 	try {
// 		connection = await pool.getConnection();
// 		[result] = await connection.execute(query, params);
// 	} catch (err) {
// 		console.error("Error executing query:", err.message);
// 		throw err; // Re-throw the error after logging it
// 	} finally {
// 		if (connection) connection.release();
// 	}

// 	return result;
// }

// module.exports = { query };


const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Test DB connection when server starts
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully to database:", process.env.MYSQL_DATABASE);
    connection.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1); // Exit the app if DB is unreachable
  }
})();

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


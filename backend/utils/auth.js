const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const SECRET_KEY = process.env.SECRET_KEY;

//FUNCTION TO AUTHENTICATE USERNAME AND ASSOCIATED PASSWORD
const authenticateuser = (req, res, next) => {
	const authHeader = req?.headers?.authorization;
	const username =  req?.body?.email;
	const inputPassword = req?.body?.password;
	const usertype = req?.body?.usertype;
	
	if ((!username || !inputPassword) && !authHeader) {
		return res.status(401).send("Unauthorized request! Please provide credentials or a valid token to proceed.");
	}

	const selectQuery = `SELECT id, usertype, password FROM users WHERE email =? and usertype=?`;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		try { 
			req.user = jwt.verify(token, SECRET_KEY);
			req["query"]["userid"] = req.user.id;
			// req["body"]["userid"] = req.user.id;
			return next();
		} catch (err) {
			console.log(err)
			return res.status(403).send("Invalid JWT Token");
		}
	}


	if (username && inputPassword) {
		return db.query(selectQuery, [username, usertype])
			.then((result) => {
				if (result.length === 0) {
					return res.status(401).send(`Unauthorized request: Email is not registered as ${usertype==0? 'Customer' : 'Vendor'}!!!`);
				}
				const user = result[0];
				const authenticated = bcrypt.compareSync(inputPassword, user.password);

				if (!authenticated) {
					return res.status(401).send("Unauthorized request: Invalid credentials");
				}

				req.query.userid = req.body.userid = user.id;
				return next();
			})
			.catch((error) => {
				console.error(error);
				return res.status(500).send("Internal Server Error: Unable to authenticate user");
			});
	}

	
	return res.status(500).send("Unexpected Server Error");
};


//FUNCTION TO AUTHENTICATE THE API KEY
const authenticateapikey = (req, res, next) => {
	const username = req.query.username;
	const inputapikey = req.headers["api-key"] || req.query.apikey;

	//add condition to validate username and apikey existence
	const selectquery = `select id, apikey from users where username = ?`;

	db.query(selectquery, [username])
		.then(result => {
			const user = result[0];
			const authenticated = bcrypt.compareSync(inputapikey, user?.apikey || "");

			if (!user || !authenticated) return res.status(400).send("Unauthorized request!!! Please provide a valid apikey");

			req.query.userid = user.id;
			return next();
		})
		.catch(error => {
			console.log(error);
			return res.status(422).send("Unable to Verify Apikey!!!");
		});
};

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).send("Access Denied");

	const token = authHeader.split(" ")[1];
	try {
		const user = jwt.verify(token, SECRET_KEY);
		req.user = user;
		return next();
	} catch (err) {
		return res.status(403).send("Invalid Token");
	}
};

module.exports = {authenticateuser, authenticateapikey, authenticateToken};

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const db = require("../utils/db.js");

const {authenticateuser} = require('../utils/auth.js')
const SECRET_KEY = process.env.SECRET_KEY



const getCurrentTimestamp = () => new Date().toISOString().slice(0, 19).replace("T", " ");
router.get('/', (req, res) => res.send("user route is running"))


router.post("/signup", async (req, res) => {
 
	const {fullname, email, phone, address, pincode, password, confirmpassword, usertype} = req.body;

	//Check if all required fields are provided
	if (!fullname || !password || !confirmpassword || !address || !pincode || !email || !phone || !usertype) return res.status(403).send("Missing required fields");
	
	//check if usertype is valid
	if (![0,1,2].includes(parseInt(usertype))) 
		return res.status(403).send("Invalid usertype");
	
	//Check if password and confirm password match
	if (password !== confirmpassword) return res.status(403).send("Passwords Do Not Match!!!");
	
	//Validate fullname format (alphanumeric and underscore only, 3-20 characters)
	const fullnameRegex = /^[a-zA-Z ]{3,40}$/;
	if (!fullnameRegex.test(fullname)) 
		return res.status(403).send("Fullname must be 3-40 characters long and can only contain letters, numbers, and underscores");
	
	//Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(403).send("Invalid email format");
    
	//validate pincode format
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) return res.status(403).send("Invalid pincode format");
    
	//Validate phone number format (assuming Indian format)
    const phoneRegex = /\d{9}$/;
    if (!phoneRegex.test(phone)) return res.status(403).send("Invalid phone number format");

	//Validate password format (at least 8 characters, one uppercase letter, one lowercase letter, one number, one special character)
	if (password.length < 8) return res.status(403).send("Password must be at least 8 characters long");
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password)) {
        return res.status(403).send("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
    }

	//Check if username already exists
	const query_username = `SELECT * FROM users WHERE email =? and usertype=? and is_active=1`;
	
	try {
		const users = await db.query(query_username, [email, usertype])
		if (users.length > 0) 
			return res.status(409).send("Email or Phone Already Taken!!!");

	} catch (error) {
		console.log(error);
		return res.status(422).send("Unable To Process Request");
	}

	const salt = bcrypt.genSaltSync();
	const hashedPassword = bcrypt.hashSync(password, salt);

	const querycheck = `
	SELECT * FROM users WHERE email =? and usertype =? and is_active =1
	`;
	const queryinsert = `
	INSERT INTO users ( email, phone, password, full_name, address, pincode, usertype) 
	VALUES ( ?, ?, ?, ?, ?, ?, ?)
	on duplicate key update
	phone=values(phone), password=values(password), full_name=values(full_name), address=values(address), pincode=values(pincode), modified_date = CURRENT_TIMESTAMP
	`;
	const insertparams = [ email, phone, hashedPassword, fullname, address, pincode, usertype];

	try {
		const users = await db.query(querycheck, [email, usertype])
		if (users.length > 0) {
			return res.status(200).send("User Already Exists!!!");
		}


		const result = await db.query(queryinsert, insertparams) 
		if (result.insertId) 
			return res.status(201).send("User Successfully Created. Proceed to OTP activation.");
		else
			return res.status(422).send("Unable To Process Request");

	} catch (error) {
		console.log(error);
		return res.status(422).send("Unable To Process Request");
	}

});

router.post("/signin", authenticateuser, (req, res) => {
	const token = jwt.sign({id: req.body.userid, username: req.body.username}, SECRET_KEY, {expiresIn: "1h"});
	// console.log('login token:', token)
	return res.json({token});
});
 
//to reset password
router.patch('/password/:id', authenticateuser, (req, res) => {

    const id = req.params.id;
    const newpassword = req.body.newpassword;
	const salt = bcrypt.genSaltSync();
	const hashednewPassword = bcrypt.hashSync(newpassword, salt);
    const modifieddate = getCurrentTimestamp();
	
    const updatequery = `update users set password=?, modifieddate=? where id=?`
    const params = [hashednewPassword, modifieddate, id]
	
    db.query(updatequery, params)
    .then(result => {
        if (result.affectedRows === 0) return res.status(404).send("new password cannot be same as previous one");
        res.status(200).send("password successfully changed");
    })
    .catch(error => {
        return res.status(500).json({error: error.message});
    });

})

//to change email
router.patch("/email/:id", authenticateuser, (req, res) => {

	const id = req.params.id;
	const email = req.body.email;
	const modifieddate = getCurrentTimestamp();
	const updatequery = `update users set email=?, modifiedtime=? where id=?`;
	const params = [email, modifieddate, id];

	db.query(updatequery, params)
		.then(result => {
			if (result.affectedRows === 0) return res.status(404).send("new E-mail cannot be same as previous one");
			res.status(200).send("E-mail successfully changed to : ", email);
		})
		.catch(error => {
			return res.status(500).json({error: error.message});
		});
});

//Need to add authorization logic to let only admins access this api
router.get("/getuser/:id", (req, res) => {
    const query = `SELECT username, email, phone, createddate, modifieddate, isactive FROM users WHERE id = ?`;
    const params = [req.params.id];

    db.query(query, params)
        .then(results => {
            console.log(results);
            if (results.length === 0) return res.status(404).send("User not found");
            res.status(200).json(results[0]);
        })
        .catch(error => {
            return res.status(500).json({ error: error.message });
        });
});

//Need to add authorization logic to let only admins access this api. 
// Also need to add logic to make user able to delete only his own account
router.delete("/detele/:id", authenticateuser, (req, res) => {

	const query = `Update users set isactive=0 where id=?`;
	const params = req.params.id;

	db.query(query, params)
		.then(results => {
			if (results.affectedRows === 0) return res.status(404).send("User not found");
			res.status(200).send("User deleted successfully");
		})
		.catch(error => {
			return res.status(500).json({error: error.message});
		});
});



//Not required for now but may need later for generating api keys.
router.patch("/genkey", authenticateuser, (req, res) => { 
	
	const apikey = require('crypto').randomBytes(16).toString("hex")
    const apikeyhash = bcrypt.hashSync(apikey, 10);
	const query = "Update users set apikey = ? where id = ?";
	const params = [apikeyhash, req.body.userid];

	db.query(query, params)
    .then(result => {
        if (result.affectedRows === 0) return res.status(404).send("User not found");
        return res.status(200).send(`api key successfully generated : ${apikey}`);
    })
    .catch(error => {
        return res.status(500).json({error: error.message});
    });

});

module.exports = router;
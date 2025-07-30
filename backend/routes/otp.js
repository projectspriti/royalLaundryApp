const express = require("express");
const sendEmail = require('../utils/mail')
const router = express.Router();
const db = require("../utils/db"); 
const bcrypt = require("bcryptjs");

router.post("/send/password-reset", async (req, res) => {

	const email = req.body.email;
	const usertype = req.body.usertype;
	const query = `SELECT * FROM users WHERE email =? and usertype=?`;
	const params = [email, usertype];

	const otp = Math.floor(100000 + Math.random() * 900000);

	try {
		const users = await db.query(query, params) 
		if (users.length === 0) return res.status(404).send("User not found!");


		try {
			const query = `
        		insert into user_otps (usertype, user_id, otp_code, email, created_at, expires_at, purpose) 
        		values (?, ?, ?, ?, now(), now() + interval 10 minute, 'password_reset')
        		on duplicate key update otp_code=values(otp_code), created_at=values(created_at), expires_at=values(expires_at), is_used=0;
        	`;
			const params = [usertype, users[0].id, otp, email];
			await db.query(query, params);

      await sendEmail(
        'laundry_verification_team',
        email,
        'Password Reset OTP for Laundry Account',
        `Your OTP for registration is: ${otp}`
      )

			return res.status(200).json({ message: 'OTP sent successfully' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	} catch (error) {
    console.log(error);
		return res.status(422).send("Unable To Process Request");
	}

})


router.post("/validate/password-reset", async (req, res) => {

  const usertype = req.body.usertype;
	const email = req.body.email;
	const otp = req.body.otp;
	const newpassword = req.body.password;

  //verify that user exists
  const queryuser = `select * from users where email =? and usertype=?;`;
  const queryotp = `select * from user_otps where otp_code =? and usertype = ? and user_id =? and expires_at > now() and is_used=0;`;

  try {
    const users = await db.query(queryuser, [email, usertype]);
    if (users.length === 0) return res.status(404).send("User not found!");

    await db.query(queryotp, [otp, usertype, users[0].id]);
    
    //hash password
    const salt = bcrypt.genSaltSync();
    const hashednewPassword = bcrypt.hashSync(newpassword, salt);

    //update password
    const query = `update users set password =? where id =?;`;
    await db.query(query, [hashednewPassword, users[0].id]);

    //update otp status
    const queryotpupdate = `update user_otps set is_used = 1 and purpose='password_reset' where user_id =?;`;
    await db.query(queryotpupdate, [users[0].id]);

    return res.status(200).json({ message: 'Password reset successfully' }); 
  } catch (error) {
    console.log(error);
    return res.status(422).send("Unable To Process Request");
  }

})

// Send OTP for email verification
router.post('/send/email-verify', async (req, res) => {
  try {
    const { email, usertype } = req.body;
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // In production, store OTP in database with expiry
    try {

        //verify that user exists
        const queryuser = `select * from users where email = ? and usertype = ? and is_active=0;`;
        console.log([email, usertype])
        const users = await db.query(queryuser, [email, usertype]);
        console.log(users)
        if (users.length < 1) return res.status(404).send("Unable to Send OTP. Server Error!!!");

        const query = `
        insert into user_otps (usertype, user_id, otp_code, email, created_at, expires_at) 
        values (?, ?, ?, ?, now(), now() + interval 10 minute)
        on duplicate key update otp_code=values(otp_code), created_at=values(created_at), expires_at=values(expires_at), is_used=0;
        `;
        const params = [usertype, users[0].id, otp, email];
        await db.query(query, params);
        console.log(params)
    }catch (error) {
        return res.status(500).json({error: error.message});
    }

    // Send email
    await sendEmail(
      'laundry_verification_team',
      email,
      'Email Verification OTP for Laundry Signup',
      `Your OTP for registration is: ${otp}`
    )
    
    // In production, store OTP in database with expiry
    res.status(200).json({ message: 'OTP sent successfully'});
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json('Failed to send OTP');
  }
});


router.post('/validate/email-verify', async (req, res) => {
    try {
      const { email, otp, usertype } = req.body;

      //verify that user exists
      const queryuser = `select * from users where email =? and usertype=?;`;
      const users = await db.query(queryuser, [email, usertype]);
      if (users.length < 1) return res.status(404).send("Unable to Validate OTP. Server Error!!!");
      // Check if OTP is valid
      const query = `select id from user_otps where otp_code = ? and usertype = ? and user_id = ? and purpose='registration' and expires_at > now() and is_used=0;  `;
      const params = [otp, usertype, users[0].id];
      console.log(params)
      const result = await db.query(query, params);
      console.log(result)
      // Update OTP status to used
      if (result.length > 0) {
        const otpId = result[0].id;
        const updateQuery = `update user_otps set is_used = 1 where id =?;`;
        await db.query(updateQuery, [otpId]);

        // Update user status to active
        const updateUserQuery = `update users set is_active = 1, email_verified=1 where id =?;`;
        await db.query(updateUserQuery, [users[0].id]);

      }

      if (result.length === 0) {
        return res.status(400).send('Invalid OTP or OTP has expired');
      }
      // OTP is valid, proceed with registration
      res.status(201).json({ message: 'OTP verified successfully. Account has been Activated!' });
    }catch (error) {
        return res.status(500).send(error.message);
    }

})

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../utils/db')

const query_sel_location = `
    SELECT 
        c.name AS city,
        d.name AS district,
        s.name AS state,
        "India" AS country
    FROM 
        pincodes p
        JOIN cities c ON p.city_id = c.id
        JOIN districts d ON c.district_id = d.id
        JOIN states s ON d.state_id = s.id
    WHERE 
        p.pincode = ?
    LIMIT 1;
    `

router.get('/:pincode', async (req, res) => {
    const pincode = req.params.pincode;
    console.log("pincode" , pincode);
    

    //vealidate pincode
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
        return res.status(400).json({ error: "Invalid pincode" });
    }

    try {
        const result = await db.query(query_sel_location, [pincode]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Location not found" });
        }  

        return res.status(200).json(result[0]);	
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


module.exports = router

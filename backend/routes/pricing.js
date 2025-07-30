// routes/pricingRoutes.js
const express = require('express');
const router = express.Router();

const db = require('../utils/db');

// Insert new pricing record
router.post('/add', async (req, res) => {
  const { service_id, cloth_id, price, email } = req.body;

  if (!service_id || !email || !cloth_id || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO pricing (service_id, vendor_id, cloth_id, price) select ${service_id} as sid, u.id, ${cloth_id} as cid, ${price} as p from users u where u.email='${email}' and usertype=1; `,
    );

    return res.status(201).json({
      message: 'Pricing record inserted successfully',
      pricing_id: result.insertId,
    });
  } catch (error) {
    console.error('Insert Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});


// Retrieve all pricing records
router.get('/', async (req, res) => {
  
  try {
    const rows = await db.query(`
      SELECT p.*, 
             s.name as service, 
             c.name as clothtype
      FROM pricing p
      JOIN services s ON p.service_id = s.id
      JOIN users u ON p.vendor_id = u.id
      JOIN cloth_type c ON p.cloth_id = c.id
    `);

    return res.json(rows);
  } catch (error) {
    console.error('Retrieve Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Retrieve all pricing records for a vendor by email
router.get('/:email', async (req, res) => {
  try {

    const query = `
      SELECT p.*, 
             s.name as service, 
             c.name as clothtype
      FROM pricing p
      JOIN services s ON p.service_id = s.id
      JOIN users u ON p.vendor_id = u.id
      JOIN cloth_type c ON p.cloth_id = c.id
      where u.email = ? and usertype = 1
    `
    const rows = await db.query( query, [req.params.email]);

    return res.json(rows);
  } catch (error) {
    console.error('Retrieve Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Delete pricing by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM pricing WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pricing record not found' });
    }

    return res.json({ message: 'Pricing record deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;

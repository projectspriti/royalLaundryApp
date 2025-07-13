// routes/pricingRoutes.js
const express = require('express');
const router = express.Router();

const db = require('../utils/db');

// Insert new pricing record
router.post('/', async (req, res) => {
  const { service_id, vendor_id, cloth_id, price } = req.body;

  if (!service_id || !vendor_id || !cloth_id || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO pricing (service_id, vendor_id, cloth_id, price) VALUES (?, ?, ?, ?)`,
      [service_id, vendor_id, cloth_id, price]
    );

    res.status(201).json({
      message: 'Pricing record inserted successfully',
      pricing_id: result.insertId,
    });
  } catch (error) {
    console.error('Insert Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Retrieve all pricing records
router.get('/', async (req, res) => {
  try {
    const rows = await db.query(`
      SELECT p.*, 
             s.name, 
             c.name
      FROM pricing p
      JOIN services s ON p.service_id = s.service_id
      JOIN vendor_details v ON p.vendor_id = v.vendor_id
      JOIN cloth_type c ON p.cloth_id = c.cloth_id
    `);

    res.json(rows);
  } catch (error) {
    console.error('Retrieve Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete pricing by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM pricing WHERE pricing_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pricing record not found' });
    }

    res.json({ message: 'Pricing record deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});




module.exports = router;

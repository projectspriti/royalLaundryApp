// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db')

// insert data
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO services (name, description) VALUES (?, ?)',
            [name, description]
        );
        res.status(201).json({
            message: 'Cloth type added successfully',
            clothTypeId: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// retrieve data
router.get('/', async (req, res) => {

    try {
        const rows = await db.query('SELECT * FROM services');
        return res.json(rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }

});

// delete data
router.delete('service_id', async (req, res) => {
    const { service_id } = req.params;

    try {
        const result = await db.query('DELETE FROM services WHERE clotservice_idh_id = ?', [service_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cloth type not found' });
        }

        res.json({ message: 'Cloth type deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;

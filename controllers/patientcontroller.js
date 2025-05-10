const pool = require('../models/db');

// GET all
exports.getAllPatients = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM patient');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST
exports.createPatient = async (req, res) => {
    const { id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO patient (id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient]
        );
        res.json({ 
            id_patient: result.insertId, 
            code_patient, 
            name_patient, 
            dob_patient, 
            gender_patient, 
            phone_patient, 
            address_patient 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT
exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE patient SET code_patient = ?, name_patient = ?, dob_patient = ?, gender_patient = ?, phone_patient = ?, address_patient = ? WHERE id_patient = ?',
            [code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET by ID
exports.getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM patient WHERE id_patient = ?', [id]);
        if (results.length === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET by Code
exports.getPatientByCode = async (req, res) => {
    const { code } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM patient WHERE code_patient = ?', [code]);
        if (results.length === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET by Name (search)
exports.searchPatientByName = async (req, res) => {
    const { name } = req.query;
    try {
        const [results] = await pool.query(
            'SELECT * FROM patient WHERE name_patient LIKE ?',
            [`%${name}%`]
        );
        if (results.length === 0) return res.status(404).json({ message: 'No patients found' });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM patient WHERE id_patient = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
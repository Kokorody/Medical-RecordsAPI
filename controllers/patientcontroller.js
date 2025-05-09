const pool = require('../models/db');

// GET all
exports.getAllPatients = (req, res) => {
    pool.query('SELECT * FROM patient', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// POST
exports.createPatient = (req, res) => {
    const { id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient } = req.body;
    pool.query(
        'INSERT INTO patient (id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id_patient: result.insertId, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient });
        }
    );
};

// PUT
exports.updatePatient = (req, res) => {
    const { id } = req.params;
    const { code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient } = req.body;
    pool.query(
        'UPDATE patient SET code_patient = ?, name_patient = ?, dob_patient = ?, gender_patient = ?, phone_patient = ?, address_patient = ? WHERE id_patient = ?',
        [code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient not found' });
            res.json({ message: 'Patient updated' });
        }
    );
};

// GET by ID
exports.getPatientById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM patient WHERE id_patient = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json(results[0]);
    });
};

// GET by Code
exports.getPatientByCode = (req, res) => {
    const { code } = req.params;
    pool.query('SELECT * FROM patient WHERE code_patient = ?', [code], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json(results[0]);
    });
};

// GET by Name (search)
exports.searchPatientByName = (req, res) => {
    const { name } = req.query;
    pool.query(
        'SELECT * FROM patient WHERE name_patient LIKE ?',
        [`%${name}%`],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'No patients found' });
            res.json(results);
        }
    );
};

// DELETE
exports.deletePatient = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM patient WHERE id_patient = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient deleted' });
    });
};

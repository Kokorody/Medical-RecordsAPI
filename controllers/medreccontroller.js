const pool = require('../models/db'); // Ensure this uses mysql2/promise

exports.getAllMedrec = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM medrec');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMedrec = async (req, res) => {
  const { id_medrec, code_medrec, id_patient, id_doctor, diagnose, treatment, notes } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO medrec (id_medrec, code_medrec, id_patient, id_doctor, diagnose, treatment, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_medrec, code_medrec, id_patient, id_doctor, diagnose, treatment, notes]
    );
    res.json({
      id_medrec: result.insertId || id_medrec,
      code_medrec,
      id_patient,
      id_doctor,
      diagnose,
      treatment,
      notes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMedrec = async (req, res) => {
  const { id } = req.params;
  const { code_medrec, id_patient, id_doctor, diagnose, treatment, notes } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE medrec SET code_medrec = ?, id_patient = ?, id_doctor = ?, diagnose = ?, treatment = ?, notes = ? WHERE id_medrec = ?',
      [code_medrec, id_patient, id_doctor, diagnose, treatment, notes, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medrec not found' });
    }
    res.json({ message: 'Medrec updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMedrec = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM medrec WHERE id_medrec = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medrec not found' });
    }
    res.json({ message: 'Medrec deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByTreatment = async (req, res) => {
  const { treatment } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM medrec WHERE treatment LIKE ?', [`%${treatment}%`]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'No records found for given treatment' });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByDiagnose = async (req, res) => {
  const { diagnose } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM medrec WHERE diagnose LIKE ?', [`%${diagnose}%`]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'No records found for given diagnose' });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByDoctorName = async (req, res) => {
  const { doctorName } = req.params;
  try {
    const [results] = await pool.query(
      'SELECT * FROM medrec WHERE id_doctor IN (SELECT id_doctor FROM doctor WHERE name_doctor LIKE ?)',
      [`%${doctorName}%`]
    );
    if (results.length === 0) {
      return res.status(404).json({ message: 'No records found for doctor' });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByPatientName = async (req, res) => {
  const { patientName } = req.params;
  try {
    const [results] = await pool.query(
      'SELECT * FROM medrec WHERE id_patient IN (SELECT id_patient FROM patient WHERE name_patient LIKE ?)',
      [`%${patientName}%`]
    );
    if (results.length === 0) {
      return res.status(404).json({ message: 'No records found for patient' });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM medrec WHERE code_medrec = ?', [code]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'GET Code : Medical record not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM medrec WHERE id_medrec = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Medrec not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
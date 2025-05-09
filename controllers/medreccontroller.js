const pool = require('../models/db');

exports.getAllMedrec = (req, res) => {
  pool.query('SELECT * FROM medrec', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.addMedrec = (req, res) => {
  const { id_medrec, code_medrec, id_patient, id_doctor, diagnose, treatment, notes } = req.body;
  pool.query(
    'INSERT INTO medrec (id_medrec, code_medrec, id_patient, id_doctor, diagnose, treatment, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id_medrec, code_medrec, id_patient, id_doctor, diagnose, treatment, notes],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id_medrec: result.insertId || id_medrec,
        code_medrec,
        id_patient,
        id_doctor,
        diagnose,
        treatment,
        notes
      });
    }
  );
};

exports.updateMedrec = (req, res) => {
  const { id } = req.params;
  const { code_medrec, id_patient, id_doctor, diagnose, treatment, notes } = req.body;
  pool.query(
    'UPDATE medrec SET code_medrec = ?, id_patient = ?, id_doctor = ?, diagnose = ?, treatment = ?, notes = ? WHERE id_medrec = ?',
    [code_medrec, id_patient, id_doctor, diagnose, treatment, notes, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Medrec not found' });
      res.json({ message: 'Medrec updated' });
    }
  );
};

exports.deleteMedrec = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM medrec WHERE id_medrec = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Medrec not found' });
    res.json({ message: 'Medrec deleted' });
  });
};

exports.getByTreatment = (req, res) => {
  const { treatment } = req.params;
  pool.query(
    'SELECT * FROM medrec WHERE treatment LIKE ?',
    [`%${treatment}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'No records found for given treatment' });
      res.json(results);
    }
  );
};

exports.getByDiagnose = (req, res) => {
  const { diagnose } = req.params;
  pool.query(
    'SELECT * FROM medrec WHERE diagnose LIKE ?',
    [`%${diagnose}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'No records found for given diagnose' });
      res.json(results);
    }
  );
};

exports.getByDoctorName = (req, res) => {
  const { doctorName } = req.params;
  pool.query(
    'SELECT * FROM medrec WHERE id_doctor IN (SELECT id_doctor FROM doctor WHERE name_doctor LIKE ?)',
    [`%${doctorName}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'No records found for doctor' });
      res.json(results);
    }
  );
};

exports.getByPatientName = (req, res) => {
  const { patientName } = req.params;
  pool.query(
    'SELECT * FROM medrec WHERE id_patient IN (SELECT id_patient FROM patient WHERE name_patient LIKE ?)',
    [`%${patientName}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'No records found for patient' });
      res.json(results);
    }
  );
};

exports.getByCode = (req, res) => {
  const { code } = req.params;
  pool.query('SELECT * FROM medrec WHERE code_medrec = ?', [code], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'GET Code : Medical record not found' });
    res.json(results[0]);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM medrec WHERE id_medrec = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Medrec not found' });
    res.json(results[0]);
  });
};

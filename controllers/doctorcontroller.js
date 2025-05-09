const pool = require('../models/db');

// GET ALL
exports.getAllDoctors = (req, res) => {
  pool.query('SELECT * FROM doctor', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET by ID
exports.getDoctorById = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'ID Search : Doctor not found' });
    res.json(results[0]);
  });
};

// GET by Licence
exports.getDoctorByLicence = (req, res) => {
  const { licence } = req.params;
  pool.query('SELECT * FROM doctor WHERE licence = ?', [licence], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Get by Licence : Doctor not found' });
    res.json(results[0]);
  });
};

// GET by Name
exports.searchDoctorByName = (req, res) => {
  const { name } = req.query;
  pool.query(
    'SELECT * FROM doctor WHERE name_doctor LIKE ?',
    [`%${name}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'OH NYOO No doctors found' });
      res.json(results);
    }
  );
};

// POST
exports.createDoctor = (req, res) => {
  const { id_doctor, name_doctor, specialization, licence } = req.body;
  pool.query(
    'INSERT INTO doctor (id_doctor, name_doctor, specialization, licence) VALUES (?, ?, ?, ?)',
    [id_doctor, name_doctor, specialization, licence],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id_doctor: result.insertId, name_doctor, specialization, licence });
    }
  );
};

// PUT
exports.updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name_doctor, specialization, licence } = req.body;
  pool.query(
    'UPDATE doctor SET name_doctor = ?, specialization = ?, licence = ? WHERE id_doctor = ?',
    [name_doctor, specialization, licence, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Put : Doctor not found' });
      res.json({ message: 'Doctor updated' });
    }
  );
};

// DELETE
exports.deleteDoctor = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM doctor WHERE id_doctor = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Delete : Doctor not found' });
    res.json({ message: 'Doctor deleted' });
  });
};

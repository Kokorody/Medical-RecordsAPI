const pool = require('../models/db');

// GET ALL
exports.getAllDoctors = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM doctor');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'ID Search : Doctor not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by Licence
exports.getDoctorByLicence = async (req, res) => {
  const { licence } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM doctor WHERE licence = ?', [licence]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Get by Licence : Doctor not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by Name
exports.searchDoctorByName = async (req, res) => {
  const { name } = req.query;
  try {
    const [results] = await pool.query('SELECT * FROM doctor WHERE name_doctor LIKE ?', [`%${name}%`]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'OH NYOO No doctors found' });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
exports.createDoctor = async (req, res) => {
  const { id_doctor, name_doctor, specialization, licence } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO doctor (id_doctor, name_doctor, specialization, licence) VALUES (?, ?, ?, ?)',
      [id_doctor, name_doctor, specialization, licence]
    );
    res.json({ id_doctor: result.insertId || id_doctor, name_doctor, specialization, licence });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name_doctor, specialization, licence } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE doctor SET name_doctor = ?, specialization = ?, licence = ? WHERE id_doctor = ?',
      [name_doctor, specialization, licence, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Put : Doctor not found' });
    }
    res.json({ message: 'Doctor updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM doctor WHERE id_doctor = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Delete : Doctor not found' });
    }
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
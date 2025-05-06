const db = require('../db');

exports.getAll = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM doctors');
  res.json(rows);
};

exports.getById = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM doctors WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

exports.create = async (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO doctors (first_name, last_name, specialization, license_number, phone, email)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [data.first_name, data.last_name, data.specialization, data.license_number, data.phone, data.email];
  const [result] = await db.query(sql, values);
  res.json({ id: result.insertId });
};

exports.update = async (req, res) => {
  const data = req.body;
  const sql = `UPDATE doctors SET first_name=?, last_name=?, specialization=?, license_number=?, phone=?, email=?
               WHERE id=?`;
  const values = [data.first_name, data.last_name, data.specialization, data.license_number, data.phone, data.email, req.params.id];
  await db.query(sql, values);
  res.json({ message: 'Doctor updated' });
};

exports.remove = async (req, res) => {
  await db.query('DELETE FROM doctors WHERE id = ?', [req.params.id]);
  res.json({ message: 'Doctor deleted' });
};

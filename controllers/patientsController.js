// ini logic jakk

const db = require('../db');

exports.getAll = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM patients');
  res.json(rows);
};

exports.getById = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

exports.create = async (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO patients (first_name, last_name, date_of_birth, gender, address, phone, email, insurance_number)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [data.first_name, data.last_name, data.date_of_birth, data.gender, data.address, data.phone, data.email, data.insurance_number];
  const [result] = await db.query(sql, values);
  res.json({ id: result.insertId });
};

exports.update = async (req, res) => {
  const data = req.body;
  const sql = `UPDATE patients SET first_name=?, last_name=?, date_of_birth=?, gender=?, address=?, phone=?, email=?, insurance_number=?
               WHERE id=?`;
  const values = [data.first_name, data.last_name, data.date_of_birth, data.gender, data.address, data.phone, data.email, data.insurance_number, req.params.id];
  await db.query(sql, values);
  res.json({ message: 'Patient updated' });
};

exports.remove = async (req, res) => {
  await db.query('DELETE FROM patients WHERE id = ?', [req.params.id]);
  res.json({ message: 'Patient deleted' });
};

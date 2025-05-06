const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());

// --------------- START OF PATIENT ---------------
// GET ALL
app.get('/patient', (req, res) => {
    pool.query('SELECT * FROM patient', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST
app.post('/patient', (req, res) => {
    const { id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient } = req.body;
    pool.query(
      'INSERT INTO patient (id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_patient, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id_patient: result.insertId, code_patient, name_patient, dob_patient, gender_patient, phone_patient, address_patient });
      }
    );
  });

// PUT
app.put('/patient/:id', (req, res) => {
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
  });

// DELETE
app.delete('/patient/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM patient WHERE id_patient = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient not found' });
      res.json({ message: 'Patient deleted' });
    });
  });

// GET by Code
app.get('/patient/code/:code', (req, res) => {
    const { code } = req.params;
    pool.query('SELECT * FROM patient WHERE code_patient = ?', [code], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Patient not found' });
      res.json(results[0]);
    });
  });

  // GET by Name
  app.get('/patient/search', (req, res) => {
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
    });

// GET by ID
app.get('/patient/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM patient WHERE id_patient = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Patient not found' });
      res.json(results[0]);
    });
  });

// --------------- END OF PATIENT ---------------



// --------------- START OF DOCTOR ---------------

// GET ALL
-app.get('/doctor', (req, res) => {
  pool.query('SELECT * FROM doctor', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST
app.post('/doctor', (req, res) => {
  const { id_doctor, name_doctor, specialization, licence } = req.body;
  pool.query(
    'INSERT INTO doctor (id_doctor, name_doctor, specialization, licence) VALUES (?, ?, ?, ?)',
    [id_doctor, name_doctor, specialization, licence],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id_doctor: result.insertId, name_doctor, specialization, licence });
    }
  );
});

// PUT
app.put('/doctor/:id', (req, res) => {
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
});

// DELETE
app.delete('/doctor/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM doctor WHERE id_doctor = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Delete : Doctor not found' });
    res.json({ message: 'Doctor deleted' });
  });
});

// GET by Licence
app.get('/doctor/licence/:licence', (req, res) => {
  const { licence } = req.params;
  pool.query('SELECT * FROM doctor WHERE licence = ?', [licence], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Get by Licence : Doctor not found' });
    res.json(results[0]);
  });
});

// GET by Name
app.get('/doctor/search', (req, res) => {
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
});


// GET by ID
app.get('/doctor/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM doctor WHERE id_doctor = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'ID Search : Doctor not found' });
    res.json(results[0]);
  });
});


  // // GET by Name
  // app.get('/doctor/search', (req, res) => {
  //   const { name } = req.query;
  //   pool.query(
  //     'SELECT * FROM doctor WHERE name_doctor LIKE ?',
  //     [`%${name}%`],
  //     (err, results) => {
  //       if (err) return res.status(500).json({ error: err.message });
  //       if (results.length === 0) return res.status(404).json({ message: 'Get by Name : No patients found' });
  //       res.json(results);
  //     }
  //   );
  // });




// --------------- END OF DOCTOR ---------------

// --------------- START OF MEDREC ---------------

// --------------- END OF MEDREC ---------------

// ngatur port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CIHUYY!! Server sudah lari on http://localhost:${PORT}`);
});

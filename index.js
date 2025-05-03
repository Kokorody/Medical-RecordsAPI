require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// middleware  check API key
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// Routes
app.use('/api/patients', require('./routes/patients'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/records', require('./routes/records'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

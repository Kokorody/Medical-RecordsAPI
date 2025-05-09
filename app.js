const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Routing
const patientRoutes = require('./routes/patientroutes');
// const doctorRoutes = require('./routes/doctorroutes');
// const medrecRoutes = require('./routes/medrecroutes');

app.use('/patient', patientRoutes);
// app.use('/doctor', doctorRoutes);
// app.use('/medrec', medrecRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CIHUYY!!! Server jalan di http://localhost:${PORT}`);
});

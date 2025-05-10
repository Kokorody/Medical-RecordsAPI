const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();
app.use(express.json());

// Import Swagger docs
const swaggerDocs = require('./docs/swagger');

// API Key Middleware
// const apiKeyMiddleware = (req, res, next) => {
//   const apiKey = req.headers['x-api-key'];
  
//   if (!apiKey || apiKey !== process.env.API_KEY) {
//     return res.status(401).json({ 
//       error: 'Unauthorized', 
//       message: 'Invalid or missing API key' 
//     });
//   }
  
//   next();
// };

// Apply API Key middleware ke semua route except /api-docs
// Middleware to protect all routes except /api-docs
// app.use(/^(?!\/api-docs).*$/, apiKeyMiddleware);

// Swagger documentation 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routing
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientroutes');
const doctorRoutes = require('./routes/doctorroutes');
const medrecRoutes = require('./routes/medrecroutes');
const authMiddleware = require('./middleware/authorize.middleware');
const authorize = require('./middleware/authorize.middleware');

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/doctor', authMiddleware, doctorRoutes);
app.use('/medrec', authMiddleware, medrecRoutes);
app.use('/patient', authMiddleware, patientRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CIHUYY!!! Server jalan di http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

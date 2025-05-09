const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
dotenv.config();

const app = express();
app.use(express.json());

// Import Swagger docs
const swaggerDocs = require('./docs/swagger');

// API Key Middleware
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Invalid or missing API key' 
    });
  }
  
  next();
};

// Apply API Key middleware to all routes except swagger docs
app.use(/^(?!\/api-docs).*$/, apiKeyMiddleware);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
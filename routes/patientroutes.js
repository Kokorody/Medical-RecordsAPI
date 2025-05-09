const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientcontroller');

router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.get('/code/:code', patientController.getPatientByCode);
router.get('/search', patientController.searchPatientByName);
router.post('/', patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;    
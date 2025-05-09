const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorcontroller');

// URUTAN PENTING!
router.get('/search', doctorController.searchDoctorByName);
router.get('/licence/:licence', doctorController.getDoctorByLicence);
router.get('/:id', doctorController.getDoctorById);
router.get('/', doctorController.getAllDoctors);
router.post('/', doctorController.createDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;

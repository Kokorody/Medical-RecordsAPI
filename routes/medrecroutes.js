const express = require('express');
const router = express.Router();
const medrecController = require('../controllers/medreccontroller');

router.get('/', medrecController.getAllMedrec);
router.post('/', medrecController.addMedrec);
router.put('/:id', medrecController.updateMedrec);
router.delete('/:id', medrecController.deleteMedrec);
router.get('/treatment/:treatment', medrecController.getByTreatment);
router.get('/diagnose/:diagnose', medrecController.getByDiagnose);
router.get('/doctor/:doctorName', medrecController.getByDoctorName);
router.get('/patient/:patientName', medrecController.getByPatientName);
router.get('/code/:code', medrecController.getByCode);
router.get('/:id', medrecController.getById);

module.exports = router;

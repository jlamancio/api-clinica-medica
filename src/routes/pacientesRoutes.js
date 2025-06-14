const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/PacienteController');
const AnamneseController = require('../controllers/AnamneseController');



router.post('/pacientes', PacienteController.createPaciente);
router.get('/pacientes', PacienteController.getAllPacientes);
router.get('/pacientes/:id', PacienteController.getPacienteById);
router.put('/pacientes/:id', PacienteController.updatePaciente);
router.delete('/pacientes/:id', PacienteController.deletePaciente);

router.post('/anamneses', AnamneseController.createAnamnese);
router.get('/pacientes/:id/anamneses', AnamneseController.getAnamnesesByPacienteId);


module.exports = router
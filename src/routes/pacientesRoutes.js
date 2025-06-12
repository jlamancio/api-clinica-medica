const express = require('express')
const router = express.Router()
const PacienteController = require('../controllers/PacienteController')

router.post('/pacientes', PacienteController.createPaciente)
router.get('/pacientes', PacienteController.getAllPacientes)
router.get('/pacientes/:id', PacienteController.getPacienteById)
router.put('/pacientes/:id', PacienteController.updatePaciente)
router.delete('/pacientes/:id', PacienteController.deletePaciente)


module.exports = router
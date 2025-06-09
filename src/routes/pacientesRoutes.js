const express = require('express')
const router = express.Router()
const PacienteController = require('../controllers/PacienteController')

router.post('/pacientes', PacienteController.createPaciente);

module.exports = router
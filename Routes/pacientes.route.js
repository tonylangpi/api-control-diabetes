const express = require('express');
const router = express();
const {getPacientes,createPacientes} = require('../Controllers/pacientes.controller');

//rutas de CRUD sobre tabla PACIENTES EN BD EN LA NUBE
router.get('/all',getPacientes);
router.post('/create',createPacientes);
module.exports = router;



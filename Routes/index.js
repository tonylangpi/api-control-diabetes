const express = require('express');
const router = express();
const usuarios = require('./usuarios.route');
const pacientes = require('./pacientes.route');

router.use('/usuarios',usuarios);
router.use('/pacientes',pacientes);


module.exports = router; 
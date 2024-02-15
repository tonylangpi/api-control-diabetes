const express = require('express');
const router = express();
const usuarios = require('./usuarios.route');
router.use('/usuarios',usuarios);

module.exports = router; 
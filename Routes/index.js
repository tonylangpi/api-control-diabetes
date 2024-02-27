import {Router} from "express";
import usuarios from './usuarios.route.js';
import pacientes from './pacientes.route.js';
import tiposdiabetes from './tiposdiabetes.route.js';
import medicamento from './medicamento.route.js';
import expedientes from './expedientes.route.js'
import Receta from './receta.route.js'


const router = Router();

router.use('/usuarios',usuarios);
router.use('/pacientes',pacientes);
router.use('/tiposdiabetes',tiposdiabetes);
router.use('/medicamento',medicamento);
router.use('/expedientes',expedientes);
router.use('/receta',Receta);

export default router; 
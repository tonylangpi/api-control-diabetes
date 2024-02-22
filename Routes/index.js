import {Router} from "express";
import usuarios from './usuarios.route.js';
import pacientes from './pacientes.route.js';
import tiposdiabetes from './tiposdiabetes.route.js';

const router = Router();

router.use('/usuarios',usuarios);
router.use('/pacientes',pacientes);
router.use('/tiposdiabetes',tiposdiabetes);

export default router; 
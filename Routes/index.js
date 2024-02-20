import {Router} from "express";
import usuarios from './usuarios.route.js';
import pacientes from './pacientes.route.js';

const router = Router();

router.use('/usuarios',usuarios);
router.use('/pacientes',pacientes);

export default router; 
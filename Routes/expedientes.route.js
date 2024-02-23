import { Router } from 'express';
import {getExpedienteByPaciente, createExpedientePaciente} from '../Controllers/expedientes.controller.js';
const router = Router();

//rutas de CRUD sobre tabla Medicamento EN BD EN LA NUBE
router.get('/allByPaciente/:idPaciente',getExpedienteByPaciente);
router.post('/createByPaciente',createExpedientePaciente);

export default router;
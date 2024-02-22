import { Router } from 'express';
import {getPacientes,createPacientes, PacienteById, updatePaciente,changeStatusPacientes,authAppPaciente} from '../Controllers/pacientes.controller.js';
const router = Router();

//rutas de CRUD sobre tabla PACIENTES EN BD EN LA NUBE
router.get('/all',getPacientes);
router.post('/create',createPacientes);
router.get('/pacienteById/:Id_Paciente',PacienteById);
router.post('/update/:Id_Paciente',updatePaciente);
router.put('/changeStatusPaciente/:Id_Paciente',changeStatusPacientes);
router.post('/authAppPaciente',authAppPaciente )

export default router;



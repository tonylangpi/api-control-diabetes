import { Router } from 'express';
import {getMedicamento,createMedicamento, MedicamentoById, updateMedicamento} from '../Controllers/medicamento.controller.js';
const router = Router();

//rutas de CRUD sobre tabla Medicamento EN BD EN LA NUBE
router.get('/all',getMedicamento);
router.post('/create',createMedicamento);
router.get('/MedicamentoById/:Id_Medicamento',MedicamentoById);
router.post('/update/:Id_Medicamento',updateMedicamento);

export default router;



import { Router } from 'express';
import {getTipoD,createTipoD, TipoDiabetesById, updateTipoD} from '../Controllers/tiposdiabetes.controller.js';
const router = Router();

//rutas de CRUD sobre tabla Tipos de Diabetes EN BD EN LA NUBE
router.get('/all',getTipoD);
router.post('/create',createTipoD);
router.get('/TipoDiabetesById/:ID_Diabetes',TipoDiabetesById);
router.post('/update/:ID_Diabetes',updateTipoD);

export default router;



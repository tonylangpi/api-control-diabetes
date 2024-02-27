import { Router } from 'express';
import {getRecetaByFicha, createRecetaFicha} from '../Controllers/receta.controller.js';
const router = Router();

//rutas de CRUD sobre tabla Recetas EN BD EN LA NUBE
router.get('/allByReceta/:ID_RECETA',getRecetaByFicha);
router.post('/createByReceta',createRecetaFicha);

export default router;
import { Router } from 'express';
import {getRecetaByFicha, createRecetaFicha, deleteRecetaByFicha } from '../Controllers/receta.controller.js';
const router = Router();

//rutas de CRUD sobre tabla Recetas EN BD EN LA NUBE
router.get('/allByReceta/:ID_RECETA',getRecetaByFicha);
router.post('/createByReceta',createRecetaFicha);
router.put('/deleteByFicha/:ID_RECETA', deleteRecetaByFicha);

export default router;  
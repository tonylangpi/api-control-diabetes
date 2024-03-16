import { Router } from 'express';
import {createNivelazucar, getNivelazucar } from '../Controllers/nivel_azucar.controller.js';
const router = Router();

//rutas de CRUD sobre tabla nivel_azucar EN BD EN LA NUBE
router.get('/all',getNivelazucar);
router.post('/createnivel',createNivelazucar);

export default router;  
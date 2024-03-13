import { Router } from 'express';
import {createNivelazucar } from '../Controllers/nivel_azucar.controller.js';
const router = Router();

//rutas de CRUD sobre tabla nivel_azucar EN BD EN LA NUBE

router.post('/createnivel',createNivelazucar);

export default router;  
import { Router } from 'express';
import {getFicha} from '../Controllers/fichamedica.controller.js';
const router = Router();

//rutas de CRUD sobre tabla ficha medica EN BD EN LA NUBE
router.get('/all',getFicha);

export default router;

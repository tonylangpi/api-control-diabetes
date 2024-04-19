import { Router } from 'express';
import {getFicha, getdescarga, getdescargaEx, getdescargaCs} from '../Controllers/fichamedica.controller.js';
const router = Router();

//rutas de CRUD sobre tabla ficha medica EN BD EN LA NUBE
router.get('/all',getFicha);
router.get('/descarga/:idPaciente',getdescarga);
router.get('/descargaEx/:idPaciente',getdescargaEx);
router.get('/descargaCs/:idPaciente',getdescargaCs);

export default router;

import {Router} from "express";
import {getUsers,createUsers} from '../Controllers/usuarios.controller.js';

const router = Router();

//rutas de CRUD sobre tabla USUARIOS EN BD EN LA NUBE
router.get('/all',getUsers);
router.post('/create',createUsers);

export default router;
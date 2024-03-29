import {Router} from "express";
import {getUsers,createUsers,inactivateUser,updateUser,UsuarioByID, updatePassword} from '../Controllers/usuarios.controller.js';

const router = Router();

//rutas de CRUD sobre tabla USUARIOS EN BD EN LA NUBE
router.get('/all',getUsers);
router.post('/create',createUsers);
router.get('/usuarioById/:ID_Usuario',UsuarioByID);
router.put('/inactivateUser/:Id_Usuario',inactivateUser)
router.put('/updateUser/:Id_Usuario',updateUser)
router.put('/updatePassword/:Id_Usuario',updatePassword)

export default router;
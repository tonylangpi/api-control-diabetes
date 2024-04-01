import { Router } from 'express';
import {chatear} from '../Controllers/chatbot.controller.js';
const router = Router();

//rutas de CRUD sobre tabla Medicamento EN BD EN LA NUBE
router.post('/ai',chatear);

export default router;
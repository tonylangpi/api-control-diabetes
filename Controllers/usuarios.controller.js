import {sequelize} from '../Database/bd.js'
import bcrypt from "bcryptjs";
import {Usuario} from '../Modelos/usuarios.modelo.js'
const usuario  = new Usuario();
const getUsers = async(req, res) => {
    try {
        const result = await usuario.getUsuarios();
         res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const createUsers = async(req, res) => {
    const data = req.body;
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try{
        if(!data.Nombres.trim() || !data.apellidos.trim() || !data.Correo.trim() || !data.Contrasena.trim() || !data.Rol.length == 0){
           return  res.json({message: 'Todos los campos son obligatorios'});
        } else if(!emailregex.test(data.Correo)){
            return res.json({message: 'El correo no es valido'});
        }
        const userFound = await usuario.userFound(data.Correo);
        if(userFound.length > 0){
            return res.json({message: 'El correo ya existe'});
        }else {
            const result = await usuario.createUsuario(data);
            res.json({message: 'Usuario creado correctamente'});
        }
        
    }catch(error){
       console.log(error)
    }
}

export {
    getUsers,
    createUsers
}
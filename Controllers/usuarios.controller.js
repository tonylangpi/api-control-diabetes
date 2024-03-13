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
    console.log(data)
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try{
        if(!data.Nombres.trim() || !data.apellidos.trim() || !data.Correo.trim() || !data.Contrasena.trim()){
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

const inactivateUser = async(req, res) => {
    const {Id_Usuario} = req.params;
    const {Estado} = req.body;
    try {
        const result = await usuario.inactiveUser(Id_Usuario, Estado);
        res.json({message: "Estado del usuario actualizado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
 }
 const UsuarioByID = async(req, res) => {
    const {ID_Usuario} = req.params;
    try {
        const result = await usuario.foundUsuarioById(ID_Usuario);
        res.json(result[0]);
    } catch (error) {
        console.log(error);
    }

}
const updateUser = async(req, res) => {
    const {Id_Usuario} = req.params;
    const data = req.body;
    try {
        const result = await usuario.UpdateDataUsers(Id_Usuario, data);
        res.json({message: "Usuario actualizado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const updatePassword = async(req, res) => {
    const {Id_Usuario} = req.params;
    const data = req.body;
    try {
        const result = await usuario.UpdatePassword(Id_Usuario, data);
        res.json({message: "Contraseña actualizada con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

export {
    getUsers,
    createUsers,
    inactivateUser,
    updateUser,
    UsuarioByID,
    updatePassword
}
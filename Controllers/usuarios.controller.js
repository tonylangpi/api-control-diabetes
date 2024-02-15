const { sequelize } = require("../Database/bd");
const bcrypt = require('bcryptjs');

const getUsers = async(req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM usuarios');
         res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const createUsers = async(req, res) => {
    const {Nombres, apellidos, Correo, Contrasena, Rol} = req.body;
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try{
        if(!Nombres.trim() || !apellidos.trim() || !Correo.trim() || !Contrasena.trim() || !Rol.length == 0){
           return  res.json({message: 'Todos los campos son obligatorios'});
        } else if(!emailregex.test(Correo)){
            return res.json({message: 'El correo no es valido'});
        }
        const userFound = await sequelize.query('SELECT * FROM usuarios WHERE Correo = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [Correo]
        });
        if(userFound.length > 0){
            return res.json({message: 'El correo ya existe'});
        }else {
              let passwordHash = await bcrypt.hash(Contrasena, 10);
            const result = await sequelize.query('INSERT INTO usuarios (Nombres, apellidos, Correo, Contrasena, Rol, Estado) VALUES (?, ?, ?, ?, ?, ?)', {
                replacements: [Nombres, apellidos, Correo, passwordHash, Rol, "ACTIVO"]
            });
            res.json({message: 'Usuario creado correctamente'});
        }
        
    }catch(error){
       console.log(error)
    }
}

module.exports ={
    getUsers,
    createUsers
}
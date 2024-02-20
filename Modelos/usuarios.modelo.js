import {sequelize} from "../Database/bd.js";
import bcrypt from "bcryptjs";

export class Usuario {
    constructor(){
        this.sequelize = sequelize
    }
    async getUsuarios(){
        try {
            const result = await this.sequelize.query('SELECT * FROM usuarios');
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async createUsuario(data){
        const passwordHash = await bcrypt.hash(data.Contrasena, 10);
        const result = await sequelize.query('INSERT INTO usuarios (Nombres, apellidos, Correo, Contrasena, Rol, Estado) VALUES (?, ?, ?, ?, ?, ?)', {
            replacements: [data.Nombres, data.apellidos, data.Correo, passwordHash, data.Rol, "ACTIVO"]
        });
        return result
    }
   
    async userFound(Correo){
        const userFound = await sequelize.query('SELECT * FROM usuarios WHERE Correo = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [Correo]
        });
        return userFound
    }

}
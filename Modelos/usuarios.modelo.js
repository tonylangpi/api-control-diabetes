import {sequelize} from "../Database/bd.js";
import bcrypt from "bcryptjs";

export class Usuario {
  constructor() {
    this.sequelize = sequelize;
  }
  async getUsuarios() {
    try {
      const result = await this.sequelize
        .query(`SELECT usu.ID_Usuario, usu.Nombres, usu.Apellidos, usu.Correo, r.Descripcion, usu.Estado FROM Usuarios usu
        INNER JOIN Roles r on r.Id_Rol  = usu.Rol;`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createUsuario(data) {
    const passwordHash = await bcrypt.hash(data.Contrasena, 10);
    const result = await sequelize.query(
      "INSERT INTO Usuarios (Nombres, Apellidos, Correo, Contrasena, Rol, Estado) VALUES (?, ?, ?, ?, ?, ?)",
      {
        replacements: [
          data.Nombres,
          data.apellidos,
          data.Correo,
          passwordHash,
          data.Rol,
          "ACTIVO",
        ],
      }
    );
    return result;
  }

  async userFound(Correo) {
    const userFound = await sequelize.query(
      "SELECT * FROM usuarios WHERE Correo = ?",
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: [Correo],
      }
    );
    return userFound;
  }

  async inactiveUser(idUsuario, Estado) {
    if (Estado == "ACTIVO") {
      const result = await sequelize.query(
        "UPDATE Usuarios SET Estado = ? WHERE Id_Usuario = ?",
        {
          replacements: ["INACTIVO", idUsuario],
        }
      );
      return result;
    } else if (Estado == "INACTIVO") {
      const result = await sequelize.query(
        "UPDATE Usuarios SET Estado = ? WHERE Id_Usuario = ?",
        {
          replacements: ["ACTIVO", idUsuario],
        }
      );
      return result;
    }
  }
  async foundUsuarioById(ID_Usuario){
    const usuarioFound = await this.sequelize.query('SELECT * FROM Usuarios WHERE ID_Usuario = ?', {
        type: this.sequelize.QueryTypes.SELECT,
        replacements: [ID_Usuario]
    });
    return usuarioFound;
}
  async UpdateDataUsers(idUsuario, data) {
    const result = await sequelize.query('UPDATE Usuarios SET Nombres = ?, Apellidos = ?, Correo = ? WHERE ID_Usuario = ?', {
      replacements: [data.Nombres, data.apellidos, data.Correo, idUsuario]
    });
   return result;
  }

  async UpdatePassword(idUsuario, data) {
    const passwordHash = await bcrypt.hash(data.Contrasena, 10);
    const result = await sequelize.query('UPDATE Usuarios SET Contrasena = ? WHERE ID_Usuario = ?', {
      replacements: [passwordHash, idUsuario]
    });
   return result;
  }


async guardarCodigoAcceso(email, code) {
  try {
    const result =await sequelize.query('UPDATE Usuarios SET Acceso = ? WHERE Correo = ?', {
      replacements: [code, email],
      type: sequelize.QueryTypes.UPDATE
    });
    return result;
  } catch (error) {
    console.error('Error al guardar el código de acceso en la tabla de usuarios:', error);
    throw new Error('Error al guardar el código de acceso en la tabla de usuarios');
  }
};

async verifyCode1 (code) {
  try {
    const result = await sequelize.query(`SELECT * FROM Usuarios WHERE Acceso = ?`, {
      replacements: [code],
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(result)
    return result
  } catch (error) {
    console.error('Error al verificar el código:', error);
    throw new Error('Error al verificar el código');
  }
};

  async login(email, pass) {
    const result = await sequelize.query(`SELECT usu.ID_Usuario, usu.Nombres, usu.Apellidos, usu.Correo, usu.Contrasena, r.Descripcion, usu.Estado FROM Usuarios usu 
  INNER JOIN Roles r ON r.Id_Rol = usu.Rol
  WHERE usu.Correo = ?`, {
      type: sequelize.QueryTypes.SELECT,
      replacements: [email]
    });   
    const usuarioEncontrado = result[0];
    if (!usuarioEncontrado) {
        console.log("Usuario no encontrado");
        return null; // Cambiado para devolver null en caso de que el usuario no sea encontrado
    }
    console.log(usuarioEncontrado);
    console.log(pass);
    const passwordMatch = await bcrypt.compare(pass, usuarioEncontrado.Contrasena);  
    if (!passwordMatch) {
        console.log("Contraseña incorrecta");
        return null; // Cambiado para devolver null en caso de que la contraseña no coincida
    } 
    console.log("Usuario autenticado correctamente");
    return usuarioEncontrado;
}


}
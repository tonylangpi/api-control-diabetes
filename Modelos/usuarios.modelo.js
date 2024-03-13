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
}
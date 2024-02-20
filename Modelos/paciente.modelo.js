import {sequelize} from "../Database/bd.js";

export class Paciente {
    constructor(){
        this.sequelize = sequelize
    }
    async getPacientes(){
        try {
            const result = await this.sequelize.query('SELECT * FROM Pacientes');
            return result
        } catch (error) {
            console.log(error);
        }
    }
    async PacienteFound(DPI){
        const pacienteFound = await this.sequelize.query('SELECT * FROM Pacientes WHERE DPI = ?', {
            type: this.sequelize.QueryTypes.SELECT,
            replacements: [DPI]
        });
        return pacienteFound
    }

    async createPacientes(data){
        const result = await sequelize.query('INSERT INTO Pacientes (Nombres, Apellidos, Telefono, DPI, Fecha_Nacimiento, Correo, Direccion, Tipo_de_Sangre, Cuadro_Clinico, Genero, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                {
                    replacements: 
                    [data.Nombres,
                     data.Apellidos, 
                     data.Telefono, 
                     data.DPI, 
                     data.Fecha_Nacimiento, 
                     data.Correo, 
                     data.Direccion, 
                     data.Tipo_de_Sangre, 
                     data.Cuadro_Clinico, 
                     data.Genero, 
                     data.Estado]
                }
            );
        return result
    }

    async foundPacienteById(Id_Paciente){
        const pacienteFound = await this.sequelize.query('SELECT * FROM Pacientes WHERE Id_Paciente = ?', {
            type: this.sequelize.QueryTypes.SELECT,
            replacements: [Id_Paciente]
        });
        return pacienteFound
    }

    async updatePaciente(Id_Paciente, data){
        const result = await this.sequelize.query('UPDATE Pacientes SET Nombres = ?, Apellidos = ?, Telefono = ?, DPI = ?, Fecha_Nacimiento = ?, Correo = ?, Direccion = ?, Tipo_de_Sangre = ?, Cuadro_Clinico = ?, Genero = ?  WHERE Id_Paciente = ?',
                {
                    replacements: 
                    [data.Nombres,
                     data.Apellidos, 
                     data.Telefono, 
                     data.DPI, 
                     data.Fecha_Nacimiento, 
                     data.Correo, 
                     data.Direccion, 
                     data.Tipo_de_Sangre, 
                     data.Cuadro_Clinico, 
                     data.Genero, 
                     Id_Paciente]
                }
            );
        return result
    }
    async changeStatusPaciente(Id_Paciente, Estado){
        if(Estado == "ACTIVO"){
            const result = await this.sequelize.query('UPDATE Pacientes SET Estado = ? WHERE Id_Paciente = ?',
                {
                    replacements: 
                    ["INACTIVO", Id_Paciente]
                }
            );
        return result
        }else{
            const result = await this.sequelize.query('UPDATE Pacientes SET Estado = ? WHERE Id_Paciente = ?',
                {
                    replacements: 
                    ["ACTIVO", Id_Paciente]
                }
            );
        }
       
    }
}
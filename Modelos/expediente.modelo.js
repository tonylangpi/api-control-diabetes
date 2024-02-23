import {sequelize} from "../Database/bd.js";

export class Expediente {
    constructor(){
        this.sequelize = sequelize
    }
    async getExpedientesByIdPaciente(idPaciente){
        try {
            const result = await this.sequelize.query(`
            SELECT 
            FM.Id_Ficha, 
            FM.Motivo_Consulta, 
            FM.Id_Paciente, 
            usu.Nombres as Usuario, 
            td.Descripcion as Tipo_Diabetes, 
            FM.Fecha, 
            FM.Diagnostico, 
            FM.Proxima_visita, 
            FM.Nivel_Azucar,
            FM.Recomendaciones,
            FM.Estado
            FROM Ficha_Medicas FM  
            INNER JOIN Usuarios usu on FM.Id_usuario = usu.Id_Usuario
            INNER JOIN Tipo_Diabetes td  on td.ID_Diabetes = FM.Id_Diabetes
            WHERE Id_Paciente = ?
            `,
            {
                replacements: [idPaciente],
                type: this.sequelize.QueryTypes.SELECT
            });
            return result
        } catch (error) {
            console.log(error);
        }
    }
    async createExpedienteEncabezadoByPaciente(datosExpediente){
        console.log(datosExpediente)
        try {
            const result = await this.sequelize.query(`
            INSERT INTO Ficha_Medicas (Motivo_Consulta, Id_Paciente, Id_Usuario, Id_Diabetes, Fecha, Diagnostico, Proxima_visita, Nivel_Azucar, Tiempo_tratamiento, Recomendaciones, Estado)
            VALUES (?,?,?,?,GETDATE(),?,?,?,?,?,?)
            `,
            {
                replacements: [
                    datosExpediente.Motivo_Consulta,
                    datosExpediente.Id_Paciente,
                    datosExpediente.Id_Usuario,
                    datosExpediente.Id_Diabetes,
                    datosExpediente.Diagnostico,
                    datosExpediente.Proxima_visita,
                    datosExpediente.Nivel_Azucar,
                    datosExpediente.Tiempo_tratamiento,
                    datosExpediente.Recomendaciones,
                    datosExpediente.Estado
                ],
                type: this.sequelize.QueryTypes.INSERT
            });
            return result
        } catch (error) {
            console.log(error);
        }
    }
}
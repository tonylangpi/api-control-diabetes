import {sequelize} from "../Database/bd.js";

export class Ficha {
    constructor(){
        this.sequelize = sequelize
    }
    async getFichas(){
        try {
            const result = await this.sequelize.query('SELECT F.*, P.Nombres, P.Apellidos, P.DPI FROM Ficha_Medicas F INNER JOIN Pacientes P ON F.Id_Paciente = P.Id_Paciente ORDER BY F.Fecha DESC');
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async getFichasPorIdPaciente(idPaciente) {
        try {
            const result = await this.sequelize.query(`
            SELECT DISTINCT F.*, P.Nombres, P.Apellidos, P.DPI, R.Instruccion, M.Descripcion AS Medicamento
            FROM Ficha_Medicas F
            INNER JOIN Pacientes P ON F.Id_Paciente = P.Id_Paciente 
            INNER JOIN Recetas R ON F.Id_Diabetes = R.ID_FICHA
            INNER JOIN Medicamentos M ON M.Id_Medicamento = R.ID_MEDICAMENTO
            WHERE F.Id_Paciente = ?
            ORDER BY F.Fecha DESC;
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


    }
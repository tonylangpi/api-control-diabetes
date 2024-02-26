import { sequelize } from "../Database/bd.js";

export class Receta {
    constructor() {
        this.sequelize = sequelize
    }
    async getRecetasByFicha(ID_RECETA) {
        try {
            const result = await this.sequelize.query(`
            SELECT 
            RE.ID_RECETA, 
            ME.Descripcion,
            RE.ID_FICHA,
            RE.Instruccion 
        FROM Recetas RE  
        INNER JOIN Ficha_Medicas FM on RE.ID_FICHA = FM.Id_Ficha
        INNER JOIN Medicamentos ME on ME.Id_Medicamento = RE.ID_MEDICAMENTO
        WHERE FM.Id_Ficha = ?;
            `,
                {
                    replacements: [ID_RECETA],
                    type: this.sequelize.QueryTypes.SELECT
                });
            return result
        } catch (error) {
            console.log(error);
        }
    }


    async createRecetaFichas(receta) {
        console.log(receta)
        try {
            const result = await this.sequelize.query(`
            INSERT INTO Recetas (ID_MEDICAMENTO, ID_FICHA, Instruccion)
            VALUES (?,?,?)
            `,
                {
                    replacements: [
                        receta.ID_MEDICAMENTO,
                        receta.ID_FICHA,
                        receta.Instruccion,
                    ],
                    type: this.sequelize.QueryTypes.INSERT
                });
            return result
        } catch (error) {
            console.log(error);
        }
    }
}
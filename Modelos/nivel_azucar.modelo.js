import { sequelize } from "../Database/bd.js";

export class Nivel_Azucar {
    constructor() {
        this.sequelize = sequelize
    }
    
    async createAzucar(azucar) {
        console.log(azucar)
        try {
            const result = await this.sequelize.query(`
                INSERT INTO Toma_de_Azucar (Id_paciente, Fecha, Nivel_Azucar)
                VALUES (:Id_paciente, GETDATE(), :Nivel_Azucar)
            `,
            {
                replacements: {
                    Id_paciente: azucar.Id_paciente,
                    Nivel_Azucar: azucar.Nivel_azucar,
                },
                type: this.sequelize.QueryTypes.INSERT
            });
            return result
        } catch (error) {
            console.log(error);
        }
    }
}
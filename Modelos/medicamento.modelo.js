import {sequelize} from "../Database/bd.js";

export class Medicamento {
    constructor(){
        this.sequelize = sequelize
    }
    async getMedicamento(){
        try {
            const result = await this.sequelize.query('SELECT * FROM Medicamentos');
            return result
        } catch (error) {
            console.log(error);
        }
    }
    
    async MedicamentoFound(Descripcion) {
            const result = await sequelize.query('SELECT * FROM Medicamentos WHERE Descripcion = :Descripcion', {
                replacements: { Descripcion: Descripcion },
                type: sequelize.QueryTypes.SELECT
            });
    
            return result;
    }

    async createMedicamento(data) {
        const result = await sequelize.query('INSERT INTO Medicamentos (Descripcion) VALUES (?)', {
            replacements: [data.Descripcion]
        });
        return result;
    }


    async foundMedicamentoById(Id_Medicamento){
        const medicamentoFound = await this.sequelize.query('SELECT * FROM Medicamentos WHERE Id_Medicamento = ?', {
            type: this.sequelize.QueryTypes.SELECT,
            replacements: [Id_Medicamento]
        });
        return medicamentoFound;
    }


    async updateMedicamento(Id_Medicamento, data) {
        const result = await this.sequelize.query('UPDATE Medicamentos SET Descripcion = ? WHERE Id_Medicamento = ?',
            {
                replacements: [data.Descripcion, Id_Medicamento]
            }
        );
        return result;
    }
    
}
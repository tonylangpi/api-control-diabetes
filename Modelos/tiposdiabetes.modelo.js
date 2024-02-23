import {sequelize} from "../Database/bd.js";

export class Tipo_Diabetes {
    constructor(){
        this.sequelize = sequelize
    }
    async getTipoD(){
        try {
            const result = await this.sequelize.query('SELECT * FROM Tipo_Diabetes');
            return result
        } catch (error) {
            console.log(error);
        }
    }
    
    async TipoDFound(Descripcion) {
            const result = await sequelize.query('SELECT * FROM Tipo_Diabetes WHERE Descripcion = :Descripcion', {
                replacements: { Descripcion: Descripcion },
                type: sequelize.QueryTypes.SELECT
            });
    
            return result;
    }

    async createTipoD(data) {
        const result = await sequelize.query('INSERT INTO Tipo_Diabetes (Descripcion) VALUES (?)', {
            replacements: [data.Descripcion]
        });
        return result;
    }


    async foundTipoDiabetesById(ID_Diabetes){
        const tipoDFound = await this.sequelize.query('SELECT * FROM Tipo_Diabetes WHERE ID_Diabetes = ?', {
            type: this.sequelize.QueryTypes.SELECT,
            replacements: [ID_Diabetes]
        });
        return tipoDFound;
    }


    async updateTipoD(ID_Diabetes, data) {
        const result = await this.sequelize.query('UPDATE Tipo_Diabetes SET Descripcion = ? WHERE ID_Diabetes = ?',
            {
                replacements: [data.Descripcion, ID_Diabetes]
            }
        );
        return result;
    }
    
}
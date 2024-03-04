import {sequelize} from "../Database/bd.js";

export class Ficha {
    constructor(){
        this.sequelize = sequelize
    }
    async getFichas(){
        try {
            const result = await this.sequelize.query('SELECT * FROM Ficha_Medicas ORDER BY Fecha DESC');
            return result
        } catch (error) {
            console.log(error);
        }
    }
    }
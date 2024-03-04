import {Ficha} from '../Modelos/fichamedica.modelo.js';
const ficha = new Ficha();


const getFicha= async(req, res) => {
    try {
        const result = await ficha.getFichas();
        res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};



export {
    getFicha,
    
}
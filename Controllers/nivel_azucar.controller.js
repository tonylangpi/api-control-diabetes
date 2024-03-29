import {Nivel_Azucar} from '../Modelos/nivel_azucar.modelo.js';
const nivel_azucar = new Nivel_Azucar();

const createNivelazucar= async(req, res) => {
   const azucar = req.body

    try {
        const result = await nivel_azucar.createAzucar(azucar);
         res.json({message: 'Nivel de Azucar creado con exito'});

    } catch (error) {
        console.log(error);
    }
};


const getNivelazucar = async(req, res) => {
    try {
        const result = await nivel_azucar.getNivelAzucar();
        res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

export {
    createNivelazucar,
    getNivelazucar
}


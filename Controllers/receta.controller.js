import {Receta} from '../Modelos/receta.modulo.js';
const receta = new Receta();


const getRecetaByFicha = async(req, res) => {
    const {ID_RECETA} = req.params;
    try {
        const result = await receta.getRecetasByFicha(ID_RECETA);
         res.json(result);
    } catch (error) {
        console.log(error);
    }
};

const createRecetaFicha= async(req, res) => {
   const datosreceta = req.body
   console.log(datosreceta)
    try {
        const result = await receta.createRecetaFichas(datosreceta);
         res.json({message: 'Receta creado con exito'});

    } catch (error) {
        console.log(error);
    }
};

export {
    getRecetaByFicha,
    createRecetaFicha
}
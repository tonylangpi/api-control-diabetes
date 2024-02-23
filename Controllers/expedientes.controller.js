import {Expediente} from '../Modelos/expediente.modelo.js';
const expediente = new Expediente();


const getExpedienteByPaciente = async(req, res) => {
    const {idPaciente} = req.params;
    try {
        const result = await expediente.getExpedientesByIdPaciente(idPaciente);
         res.json(result);
    } catch (error) {
        console.log(error);
    }
};

const createExpedientePaciente = async(req, res) => {
   const datosExpediente = req.body
    try {
        const result = await expediente.createExpedienteEncabezadoByPaciente(datosExpediente);
         res.json({message: 'Expediente creado con exito'});
    } catch (error) {
        console.log(error);
    }
};

export {
    getExpedienteByPaciente,
    createExpedientePaciente
}
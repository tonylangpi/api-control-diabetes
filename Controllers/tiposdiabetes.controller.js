import {Tipo_Diabetes} from '../Modelos/tiposdiabetes.modelo.js'
const tipo_diabetes = new Tipo_Diabetes();


const getTipoD = async(req, res) => {
    try {
        const result = await tipo_diabetes.getTipoD();
         res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const createTipoD = async (req, res) => {
    const data = req.body;
    
    if (!data.Descripcion.trim()) {
        return res.json({ message: 'La descripción es obligatoria para el tipo de diabetes' });
    } 

    try {
        const result = await tipo_diabetes.createTipoD(data);
        res.json({ message: "Tipo de diabetes creado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el tipo de diabetes' });
    } 
};


const TipoDiabetesById = async (req, res) => {
    const { ID_Diabetes } = req.params;

    try {
        const result = await tipo_diabetes.foundTipoDiabetesById(ID_Diabetes);

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Tipo de diabetes no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const updateTipoD = async (req, res) => {
    const { ID_Diabetes } = req.params;
    const data = req.body;
    try {
        if (!data.Descripcion.trim()) {
            return res.json({ message: 'La descripción es obligatoria para el tipo de diabetes' });
        } else {
            const result = await tipo_diabetes.updateTipoD(ID_Diabetes, data);
            res.json({ message: "Tipo de diabetes actualizado con éxito" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export {
    getTipoD,
    createTipoD,
    TipoDiabetesById,
    updateTipoD,
}
import {Medicamento} from '../Modelos/medicamento.modelo.js'
const medicamento = new Medicamento();


const getMedicamento = async(req, res) => {
    try {
        const result = await medicamento.getMedicamento();
         res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const createMedicamento = async (req, res) => {
    const data = req.body;
    
    if (!data.Descripcion.trim()) {
        return res.json({ message: 'La descripción es obligatoria para el medicamento' });
    } 

    try {
        const result = await medicamento.createMedicamento(data);
        res.json({ message: "Medicamento creado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el medicamento' });
    } 
};


const MedicamentoById = async (req, res) => {
    const { Id_Medicamento } = req.params;

    try {
        const result = await medicamento.foundMedicamentoById(Id_Medicamento);

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Medicamento no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const updateMedicamento = async (req, res) => {
    const { Id_Medicamento } = req.params;
    const data = req.body;
    try {
        if (!data.Descripcion.trim()) {
            return res.json({ message: 'La descripción es obligatoria para el medicamento' });
        } else {
            const result = await medicamento.updateMedicamento(Id_Medicamento, data);
            res.json({ message: "Medicamento actualizado con éxito" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export {
    getMedicamento,
    createMedicamento,
    MedicamentoById,
    updateMedicamento,
}
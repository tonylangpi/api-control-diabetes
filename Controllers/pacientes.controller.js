import {Paciente} from '../Modelos/paciente.modelo.js'
const paciente = new Paciente();


const getPacientes = async(req, res) => {
    try {
        const result = await paciente.getPacientes();
         res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const createPacientes = async (req, res) => {
    //const { Nombres,Apellidos, Telefono, DPI, Fecha_Nacimiento, Correo, Direccion, Tipo_de_Sangre, Cuadro_Clinico, Genero, Estado} = req.body;
    const data = req.body;
    const dpiRegex = /^[0-9]{13}$/;

    try {
        if (
            !data.Nombres.trim() ||
            !data.Apellidos.trim() ||
            !data.Telefono.trim() ||
            !data.DPI.trim() ||
            !data.Fecha_Nacimiento ||
            !data.Correo.trim() ||
            !data.Direccion.trim() ||
            !data.Tipo_de_Sangre.trim() ||
            !data.Cuadro_Clinico.trim() ||
            !data.Genero.trim() ||
            !data.Estado.trim()
        ) {
            return res.json({ message: 'Todos los campos son obligatorios' });
        } else if (!dpiRegex.test(data.DPI)) {
            return res.json({ message: 'El DPI no es válido' });
        }

        const pacienteFound = await paciente.PacienteFound(data.DPI);

        if (pacienteFound.length > 0) {
            return res.json({ message: 'El paciente con ese DPI ya existe' });
        } else {
            const result = await paciente.createPacientes(data);
            res.json({message: "Paciente creado con éxito"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const PacienteById = async(req, res) => {
    const {Id_Paciente} = req.params;
    try {
        const result = await paciente.foundPacienteById(Id_Paciente);
        res.json(result[0]);
    } catch (error) {
        console.log(error);
    }

}

const updatePaciente = async (req, res) => {
    const {Id_Paciente} = req.params;
    const data = req.body;
    const dpiRegex = /^[0-9]{13}$/;

    try {
        if (
            !data.Nombres.trim() ||
            !data.Apellidos.trim() ||
            !data.Telefono.trim() ||
            !data.DPI.trim() ||
            !data.Fecha_Nacimiento ||
            !data.Correo.trim() ||
            !data.Direccion.trim() ||
            !data.Tipo_de_Sangre.trim() ||
            !data.Cuadro_Clinico.trim() ||
            !data.Genero.trim()
        ) {
            return res.json({ message: 'Todos los campos son obligatorios' });
        } else if (!dpiRegex.test(data.DPI)) {
            return res.json({ message: 'El DPI no es válido' });
        }else{
            const result = await paciente.updatePaciente(Id_Paciente, data);
            res.json({message: "Paciente actualizado con éxito"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

const changeStatusPacientes = async (req, res) => {
    const {Id_Paciente} = req.params;
    const {Estado} = req.body;
    try {
        const result = await paciente.changeStatusPaciente(Id_Paciente, Estado);
        res.json({message: "Estado del paciente actualizado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export {
    getPacientes,
    createPacientes,
    PacienteById,
    updatePaciente,
    changeStatusPacientes
}
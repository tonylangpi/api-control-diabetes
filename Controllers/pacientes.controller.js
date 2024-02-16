const { sequelize } = require("../Database/bd");


const getPacientes = async(req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM Pacientes');
         res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const createPacientes = async (req, res) => {
    const { Nombres,Apellidos, Telefono, DPI, Fecha_Nacimiento, Correo, Direccion, Tipo_de_Sangre, Cuadro_Clinico, Genero, Estado} = req.body;
    const dpiRegex = /^[0-9]{13}$/;

    try {
        if (
            !Nombres.trim() ||
            !Apellidos.trim() ||
            !Telefono.trim() ||
            !DPI.trim() ||
            !Fecha_Nacimiento ||
            !Correo.trim() ||
            !Direccion.trim() ||
            !Tipo_de_Sangre.trim() ||
            !Cuadro_Clinico.trim() ||
            !Genero.trim() ||
            !Estado.trim()
        ) {
            return res.json({ message: 'Todos los campos son obligatorios' });
        } else if (!dpiRegex.test(DPI)) {
            return res.json({ message: 'El DPI no es válido' });
        }

        const pacienteFound = await sequelize.query('SELECT * FROM Pacientes WHERE DPI = ?', {
            type: sequelize.QueryTypes.SELECT,
            replacements: [DPI]
        });

        if (pacienteFound.length > 0) {
            return res.json({ message: 'El paciente con DPI ya existe' });
        } else {
            const result = await sequelize.query('INSERT INTO Pacientes (Nombres, Apellidos, Telefono, DPI, Fecha_Nacimiento, Correo, Direccion, Tipo_de_Sangre, Cuadro_Clinico, Genero, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                {
                    replacements: [Nombres,Apellidos, Telefono, DPI, Fecha_Nacimiento, Correo, Direccion, Tipo_de_Sangre, Cuadro_Clinico, Genero, Estado]
                }
            );
            res.json({ message: 'Paciente creado correctamente' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports ={
    getPacientes,
    createPacientes
}
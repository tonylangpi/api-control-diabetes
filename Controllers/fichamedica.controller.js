import {Ficha} from '../Modelos/fichamedica.modelo.js';
import PDFDocument from 'pdfkit';

const ficha = new Ficha();
const getFicha= async(req, res) => {
    try {
        const result = await ficha.getFichas();
        res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const getdescarga = async (req, res) => {
    try {
      const { idPaciente } = req.params;
      const result = await ficha.getFichasPorIdPaciente(idPaciente);
  
      if (result && result.length > 0) {
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=Expediente_${idPaciente}.pdf`);
  
        // Escribir datos de la base de datos en el PDF
        result.forEach((fila) => {
          doc.text(`Codigo Expediente: ${fila.Id_Ficha}`);
          doc.text(`Fecha: ${fila.Fecha}`);
          doc.text(`DPI: ${fila.DPI}`);
          doc.text(`Nombres: ${fila.Nombres}`);
          doc.text(`Apellidos: ${fila.Apellidos}`);
          doc.text(`Motivo Consulta: ${fila.Motivo_Consulta}`);
          doc.text(`DPI: ${fila.DPI}`);
          doc.text(`Codigo Paciente: ${fila.Id_Paciente}`);
          doc.text(`Diagnostico: ${fila.Diagnostico}`);
          doc.text(`Visita: ${fila.Proxima_visita}`);
          doc.text(`Nivel de Azucar: ${fila.Nivel_Azucar}`);
          doc.text(`Tiempo de Tratamiento: ${fila.Tiempo_tratamiento}`);
          doc.text(`Recomendaciones: ${fila.Recomendaciones}`);
          doc.text(`Estado: ${fila.Estado}`);
          doc.text('***************************************************************************************');
        });
  
        // Finalizar el documento y enviar el PDF como stream al cliente
        doc.end();
        doc.pipe(res);
      } else {
        res.status(404).json({ error: 'Archivo no encontrado para el paciente' });
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

export {
    getFicha,
    getdescarga
}
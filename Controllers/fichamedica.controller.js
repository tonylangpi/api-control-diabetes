import {Ficha} from '../Modelos/fichamedica.modelo.js';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { mkConfig, generateCsv, asString } from 'export-to-csv';
import { Buffer } from 'buffer';


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
      const doc = new PDFDocument({ size: 'A4', margin: 30 });

      // Encabezado Mejorado
      doc.rect(0, 0, doc.page.width, 100).fill('#007bff');
      doc.image('Assets/logo22.png', 50, 10, { width: 80 });
      doc.font('Helvetica-Bold')
        .fontSize(22)
        .fill('#ffffff')
        .text('Expediente Médico', { align: 'center' });

        // Detalles de contacto
        doc.font('Helvetica').fill('#ffffff').fontSize(9).text(
          '5ta. Calle 2-45 zona 3 Barrio San Francisco Coatepeque, Quetzaltenango\n' +
          'Teléfono: 7775-1452 / 7458-7485\n' +
          'Tu salud es importante para nosotros',
          { align: 'center' }
        );
  

      // Separador
      doc.moveDown(1);
      doc.strokeColor('#007bff').lineWidth(1).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();

      // Información del Paciente
      doc.moveDown(1);
      doc.font('Helvetica-Bold').fill('#007bff').fontSize(16).text('Información del Paciente', { underline: true });
      doc.font('Helvetica').fill('#000000').fontSize(12).text(
        `Código Paciente: ${result[0].Id_Paciente}\nNombres: ${result[0].Nombres}\nApellidos: ${result[0].Apellidos}\nDPI: ${result[0].DPI}`,
        { indent: 50 }
      );

      // Separador
      doc.moveDown(1);
      doc.strokeColor('#007bff').lineWidth(1).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();

      // Información Médica
      doc.moveDown(1);
      doc.font('Helvetica-Bold').fill('#007bff').fontSize(16).text('Información Médica', { underline: true });
      result.forEach((fila) => {
        // Formatear la fecha de próxima visita
        const proximaVisita = new Date(fila.Proxima_visita);
        const fechaForma = proximaVisita.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        // Formatear la fecha
        const fechaFormateada = new Date(fila.Fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        doc.font('Helvetica').fill('#000000').fontSize(12).text(
          `Código Expediente: ${fila.Id_Ficha}\nFecha: ${fechaFormateada}\nMotivo Consulta: ${fila.Motivo_Consulta}\nDiagnóstico: ${fila.Diagnostico}\nPróxima Visita: ${fechaForma}\nNivel de Azúcar: ${fila.Nivel_Azucar}\nTiempo de Tratamiento: ${fila.Tiempo_tratamiento}\nRecomendaciones: ${fila.Recomendaciones}\nEstado: ${fila.Estado}\nReceta: ${fila.Instruccion}\nMedicamento: ${fila.Medicamento}`,
          { indent: 50 }
        );
        doc.moveDown();
      });

      // Pie de página
      doc.moveDown(2);
      doc.font('Helvetica').fontSize(10).fill('#007bff').text('https://www.mspas.gob.gt/', { align: 'center' });

      // Finalizar el documento y enviar el PDF como stream al cliente
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(`Content-Disposition`, `inline; filename=Expediente_${idPaciente}.pdf`);
      doc.end();
      doc.pipe(res);
    } else {
      res.status(404).json({ error: 'Archivo no encontrado para el paciente' });
    }
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getdescargaEx = async (req, res) => {
  try {
    const { idPaciente } = req.params;
    const result = await ficha.getFichasPorIdPaciente(idPaciente);
    if (result && result.length > 0) {
      // Crear un nuevo libro de Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Fichas Médicas');

      // Estilo para el encabezado
      const headerStyle = {
        font: { bold: true },
        alignment: { vertical: 'middle', horizontal: 'center' },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '007bff' } },
        border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
      };

      // Estilo para las celdas de datos
      const cellStyle = {
        border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
      };

      // Agregar encabezados de columna con estilo
      worksheet.columns = [
        { header: 'Código Expediente', key: 'Id_Ficha', ...headerStyle },
        { header: 'Fecha', key: 'Fecha', ...headerStyle },
        { header: 'Motivo Consulta', key: 'Motivo_Consulta', ...headerStyle },
        { header: 'Diagnóstico', key: 'Diagnostico', ...headerStyle },
        { header: 'Próxima Visita', key: 'Proxima_visita', ...headerStyle },
        { header: 'Nivel de Azúcar', key: 'Nivel_Azucar', ...headerStyle },
        { header: 'Tiempo de Tratamiento', key: 'Tiempo_tratamiento', ...headerStyle },
        { header: 'Recomendaciones', key: 'Recomendaciones', ...headerStyle },
        { header: 'Estado', key: 'Estado', ...headerStyle },
        { header: 'Receta', key: 'Instruccion', ...headerStyle },
        { header: 'Medicamento', key: 'Medicamento', ...headerStyle }
      ];

      // Agregar datos de filas con estilo
      result.forEach((fila) => {
        worksheet.addRow({
          Id_Ficha: fila.Id_Ficha,
          Fecha: fila.Fecha,
          Motivo_Consulta: fila.Motivo_Consulta,
          Diagnostico: fila.Diagnostico,
          Proxima_visita: fila.Proxima_visita,
          Nivel_Azucar: fila.Nivel_Azucar,
          Tiempo_tratamiento: fila.Tiempo_tratamiento,
          Recomendaciones: fila.Recomendaciones,
          Estado: fila.Estado,
          Instruccion: fila.Instruccion,
          Medicamento: fila.Medicamento
        }).eachCell((cell) => cell.border = { ...cellStyle.border });
      });

      // Ajustar el ancho de las columnas
      worksheet.columns.forEach((column) => {
        column.width = Math.max(column.header.length, 12);
      });

      // Enviar el libro de Excel como respuesta
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader(`Content-Disposition`, `attachment; filename=Fichas_Medicas_${idPaciente}.xlsx`);
      await workbook.xlsx.write(res);
      res.end();

    } else {
      res.status(404).json({ error: 'Archivo no encontrado para el paciente' });
    }
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getdescargaCs = async (req, res) => {
  try {
    const { idPaciente } = req.params;
    const result = await ficha.getFichasPorIdPaciente(idPaciente);

    // Verificar si hay datos disponibles
    if (result && result.length > 0) {
      // Configurar el nombre del archivo y las opciones del CSV
      const csvConfig = mkConfig({
        filename: `Fichas_Medicas_${idPaciente}`, // Nombre del archivo
        useKeysAsHeaders: true, // Utilizar claves como encabezados
      });

      // Generar el contenido del CSV
      const csvData = generateCsv(csvConfig)(result);
      const filename = `${csvConfig.filename}.csv`;

      // Convertir el contenido del CSV a un búfer de datos binarios
      const csvBuffer = Buffer.from(asString(csvData));

      // Configurar las cabeceras de la respuesta para la descarga del archivo
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Enviar el archivo CSV como respuesta de descarga
      res.status(200).send(csvBuffer);
    } else {
      // Si no hay datos disponibles, devolver un mensaje de error
      res.status(404).json({ error: 'Archivo no encontrado para el paciente' });
    }
  } catch (error) {
    // Manejar cualquier error interno del servidor
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export {
    getFicha,
    getdescarga,
    getdescargaEx,
    getdescargaCs
}
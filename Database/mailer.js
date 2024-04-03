import nodemailer from 'nodemailer';
import { config } from "dotenv";
config();

const {USER_EMAIL,
  USER_PASSWORD} = process.env;

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports, esta parte del codigo la saque de la pagina de nodemailer
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  });
  
  transporter.verify().then(()=>{

    console.log('Listo para enviar Correo');

  })

  
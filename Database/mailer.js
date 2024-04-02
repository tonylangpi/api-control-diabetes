import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports, esta parte del codigo la saque de la pagina de nodemailer
    auth: {
      user: "ignaciodeleone8@gmail.com",
      pass: "noqh totb vxjj zzwp",
    },
  });
  
  transporter.verify().then(()=>{

    console.log('Listo para enviar Correo');

  })

  
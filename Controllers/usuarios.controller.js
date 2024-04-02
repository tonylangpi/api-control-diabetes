import {Usuario} from '../Modelos/usuarios.modelo.js'
import {transporter} from '../Database/mailer.js'

const usuario  = new Usuario();
const getUsers = async(req, res) => {
    try {
        const result = await usuario.getUsuarios();
         res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
};

const createUsers = async(req, res) => {
    const data = req.body;
    console.log(data)
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try{
        if(!data.Nombres.trim() || !data.apellidos.trim() || !data.Correo.trim() || !data.Contrasena.trim()){
           return  res.json({message: 'Todos los campos son obligatorios'});
        } else if(!emailregex.test(data.Correo)){
            return res.json({message: 'El correo no es valido'});
        }
        const userFound = await usuario.userFound(data.Correo);
        if(userFound.length > 0){
            return res.json({message: 'El correo ya existe'});
        }else {
            const result = await usuario.createUsuario(data);
            res.json({message: 'Usuario creado correctamente'});
        }
        
    }catch(error){
       console.log(error)
    }
}

const inactivateUser = async(req, res) => {
    const {Id_Usuario} = req.params;
    const {Estado} = req.body;
    try {
        const result = await usuario.inactiveUser(Id_Usuario, Estado);
        res.json({message: "Estado del usuario actualizado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
 }
 const UsuarioByID = async(req, res) => {
    const {ID_Usuario} = req.params;
    try {
        const result = await usuario.foundUsuarioById(ID_Usuario);
        res.json(result[0]);
    } catch (error) {
        console.log(error);
    }

}
const updateUser = async(req, res) => {
    const {Id_Usuario} = req.params;
    const data = req.body;
    try {
        const result = await usuario.UpdateDataUsers(Id_Usuario, data);
        res.json({message: "Usuario actualizado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const updatePassword = async(req, res) => {
    const {Id_Usuario} = req.params;
    const data = req.body;
    try {
        const result = await usuario.UpdatePassword(Id_Usuario, data);
        res.json({message: "Contraseña actualizada con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

}

const correoenvio = async (req, res) => {
    try {
        const { destinatario, code } = req.body; // Obteniendo el correo electrónico del destinatario desde el cuerpo de la solicitud
        console.log(code);
        const htmlContent = `<b>Hola, estás intentando acceder a la pagina aqui esta tu contraseña. Tu código de verificación es: ${code} POR FAVOR NO LO COMPARTAS</b>`;
        const info = await transporter.sendMail({
            from: '"Control de Diabetes" <ignaciodeleone8@gmail.com>',
            to: destinatario, // Usando el correo electrónico del destinatario proporcionado
            subject: "Autenticacion Control Diabetico ✔",
            html: htmlContent,
        });
        console.log('Correo enviado correctamente:', info);
        res.json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.log('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error interno del servidor al enviar el correo electrónico' });
    }
};


const verifyCode = async (req, res) => {
    try {
        const { code } = req.body;
        const isValid = await usuario.verifyCode1(code);
        console.log(code);
        if (isValid) {
          return res.status(200).json({ success: true, message: 'Código válido' });
        } else {
          return res.status(400).json({ success: false, message: 'Código inválido' });
        }
      } catch (error) {
        console.error('Error al verificar el código:', error);
        return res.status(500).json({ success: false, message: 'Error al verificar el código' });
      }
    };

 const saveAccessCode = async (req, res) => {
    try {
      const { email, code } = req.body;
      await usuario.guardarCodigoAcceso(email, code);
      res.status(200).json({ message: 'Código de acceso guardado correctamente en la tabla de usuarios.' });
    } catch (error) {
      console.error('Error al guardar el código de acceso:', error);
      res.status(500).json({ message: 'Error interno del servidor al guardar el código de acceso en la tabla de usuarios' });
    }
  };

export {
    getUsers,
    createUsers,
    inactivateUser,
    updateUser,
    UsuarioByID,
    updatePassword,
    correoenvio,
    saveAccessCode,
    verifyCode 
}
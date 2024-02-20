import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const {DB_HOST,
       DB_USER,
       DB_PASS,
       DB_NAME,
       DB_DIALECT} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: 1433
  })
async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
      } catch (error) {
        console.error('No se puede conectar a la base de datos:', error);
      }
}
testConnection();
export {sequelize};
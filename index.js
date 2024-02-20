import express from "express";
import morgan from "morgan";
import cors from "cors";
import {config} from "dotenv";
import rutas from './Routes/index.js';


const app = express();
app.use(express.static('public'));
app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());
app.use('/',rutas);
config();

app.use((req, res, next) => {
  const apiKey = req.header("apiKey");
  if (apiKey !== process.env.API_KEY) {
    res.status(401).send("NO ACCESS");
  } else {
    next();
  }
});

const port = process.env.PORT || 4000; 
  app.listen(port, () => {
    console.log(' 🚀 El servidor ha despegado en el puerto ', port);
  });
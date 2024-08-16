import express  from "express";
import colors from 'colors'
import router from "./router";
import  db  from "./config/db";

async function connectDB() {
    try {
        await db.authenticate();
        
        console.log(colors.blue('conexion exitosa a la base de datos'));
        
    } catch (error) {
        console.log(error);
        console.log(colors.red.white('hubo un error al conectar a la base de datos'));
    }
}
connectDB();

const server = express();

//leer datos
server.use(express.json());
server.use(express.text());

//routing
server.use('/api/products', router);


export default server;
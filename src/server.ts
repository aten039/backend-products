import express  from "express";
import cors,  {CorsOptions} from 'cors';
import colors from 'colors';
import SwaggerUi  from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import  db  from "./config/db";


async function connectDB() {
    try {
        await db.authenticate();
        
        // console.log(colors.blue('conexion exitosa a la base de datos'));
        
    } catch (error) {
        console.log(error);
        console.log(colors.red.white('hubo un error al conectar a la base de datos'));
    }
}
connectDB();

const server = express();

//cors
const corsOption: CorsOptions = {
  origin: function(origin, callback){
    if(origin === process.env.FRONTEND_URL){
        callback(null, true);
    }else{
        callback(new Error('Acceso Denegado'));
    }
  }

}
server.use(cors(corsOption));
//leer datos
server.use(express.json());
server.use(express.text());

//routing
server.use('/api/products', router);

//docs 
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec) );

export default server;
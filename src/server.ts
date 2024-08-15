import express  from "express";
import router from "./router";


const server = express();

//routing
server.use('/api/products', router);


export default server;
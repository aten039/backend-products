import { Sequelize } from "sequelize-typescript";
import 'dotenv/config'

const db = new Sequelize(process.env.DBURL, {
    models: [__dirname + '/../models/**/*.ts'],
    logging:false
});


export default db;

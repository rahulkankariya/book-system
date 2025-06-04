

const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config();
const config = {
    development: {
        DB_USER: process.env.DEV_DB_USER ,
        DB_PASSWORD: process.env.DEV_DB_PASSWORD ,
        DB_NAME: process.env.DEV_DB_NAME ,
        PORT: process.env.DEV_PORT,       
        JWT_SECRET: process.env.DEV_JWT_SECRET,
        DB_ENV:process.env.DEV_ENV
    }
};

module.exports = config[ENV]; 

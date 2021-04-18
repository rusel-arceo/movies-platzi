/**En este arachivo de configuración podemos poner las variables de entorno, los puertos y toda la información que no sea sencible */

require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV.trim() !== 'production', //Tomamos la variable de entorno pero que no sea en production 
    port: process.env.PORT || 3000,  //si existe el puerto se toma, si no será 3000
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME
};

console.log('en el config. dev=',config.dev);
console.log('en el config', process.env.NODE_ENV);
console.log('en el config', process.env.CORS);
console.log('en el config', process.env.DB_USER);
module.exports = {
    config //exportamos config
};
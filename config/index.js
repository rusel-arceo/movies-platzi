/**En este arachivo de configuración podemos poner las variables de entorno, los puertos y toda la información que no sea sencible */

require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production', //Tomamos la variable de entorno pero que no sea en production
    port: process.env.PORT || 3000  //si existe el puerto se tomas, si no será 3000
}

module.exports = {
    config //exportamos config
};
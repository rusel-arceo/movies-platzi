/**Creamos el servidor express */

const express = require('express');

const app= express();

//express necesita pracial los datos del boy, de lo contratio marcará erro, para esto cargamos el siguiente middleware, del boby parser, aunque en este caso estamos mandando los datos con raw
app.use(express.json());

const {config}= require('./config/index'); //importamos nuestro modulo de configuracion
const {moviesApi}= require('./routes/movies.js');

moviesApi(app);

app.listen(config.port, ()=>{
    console.log(`Eschuchando en el puerto http://localhost:${config.port}`);
});
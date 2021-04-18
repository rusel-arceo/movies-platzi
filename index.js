/**Creamos el servidor express */

const express = require('express');
const {config}= require('./config/index'); //importamos nuestro modulo de configuracion
const {moviesApi}= require('./routes/movies.js');
const {logErrors, errorHandler} = require('./utils/middleware/errorHandler');

const app= express();

//express necesita parcial los datos del body, de lo contrario marcará error, para esto cargamos el siguiente middleware, del boby parser, aunque en este caso estamos mandando los datos con raw
app.use(express.json());
//Lo middleware de error siempre deben de ir al final de las rutas. las rutas tambien son middleware, será para evitar que se llamen al usar el next
moviesApi(app);

app.use(logErrors); //EN orden es muuuuyy importante, los middlewares de errores van al final
app.use(errorHandler);


app.listen(config.port, ()=>{
    console.log(`Eschuchando en el puerto http://localhost:${config.port}`);
});
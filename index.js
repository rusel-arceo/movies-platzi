/**Creamos el servidor express */

const express = require('express');

const app= express();

const {config}= require('./config/index'); //importamos nuestro modulo de configuracion
const {moviesApi}= require('./routes/movies.js');

moviesApi(app);

// app.get('/movies',(req, res)=>{
//     res.status(200).send(`get movies`);
// });

// app.get('/movies/:id',(req, res)=>{
//     const id= req.params.id;
//     res.status(200).send(`get movies ${id}`);
// });

// app.post('/movies', (req, res)=>{
//     res.status(201).send(`movie creada post`);
// });

// app.put('/movies/:id', (req, res)=>{
//     const id= req.params.id;
//     res.status(200).send(`movies actualizada ${id}`);
// });

// app.delete('/movies/', (req, res)=>{
//     res.status(200).send(`movies borradas`);
// });

// app.delete('/movies/:id', (req, res)=>{
//     const id= req.params.id;
//     res.status(200).send(`movies borradas ${id}`);
// });





app.listen(config.port, ()=>{
    console.log(`Eschuchando en el puerto http://localhost:${config.port}`);
});
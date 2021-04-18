const { request } = require('express');
const assert = require('assert'); //Se encarga de ver si es verdad o no nuestra comparación en el test
const proxyquire = require('proxyquire'); // Se encarga de que cuando hagamos una peticion, require en lugar de traer el paquete real, nos traiga un mock

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require ('../utils/testServer'); //El servidor temporal

describe('routes-movie', ()=>{ //Esto será lo que va a imprimir la consola. especificamos que son los test de las rutas y llama al callback
    const route= proxyquire('../routes/movies',{'../service/movies':MoviesServiceMock});  //El routes/movies dentro requiere a service/movies pero no queremos que eso suceda porque es prueba, esto no permite redirigir de '../service/movies' a MoviesServiceMock que proporcionará los servicios hechos para prueba

    const request = testServer(route);//cargamos la ruta en el servidor temporal

    decribe('GET /movies', ()=>{  //test del get movies
        //El it del modulo mocha, get movies deberia responde.. El callback es donde hacemos nuestro assert y el done indicará cuando termina nuestro test
        it('should respond with status 200', ( done ) => {
            //esto se puede hacer gracias a supertest
            request.get('/api/movies').expect(200,done);
        })
    });
}); 
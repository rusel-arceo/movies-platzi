/**La unicas responsabilidad de las rutas es como recibir parametros y como enviarselo a los servicios, los servicios si sabem que hacedr con los dartoa y devolver lo deseado */

const express=require('express');

//requierimos los esquemas
const MoviesService= require('../services/movies');
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema,
   // testSchema
} = require('../utils/schema/movies')
//requerimos el middleware que usa el join para que realice las validaciones según el esquema

const validationHandler=require('../utils/middleware/validationHandler');

const moviesApi =(app) =>{
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService= new MoviesService();
    /**Ruta get lista todos */
    router.get("/", async (req, res, next)=>{
        const { tags } =  req.query;

        try{

            const movies = await moviesService.getMovies({tags});
                       
            res.status(200).json(
                {
                    data:movies,
                    message:'movies listed'
                }
            );
        }catch(err)
        {
            next(err);
        }
    });

    /**Ruta get:/id muestra la que cumple con el id */
    //La funcion de enmedio es el middleware que verifica datos, recibe el squema y de donde sacar los datos, por defecto los saca del body. El parametro movieIF tendra un squema movieIdSchema, y los saca de los parametros
    router.get("/:movieId", /*validationHandler( { movieId: movieIdSchema}, 'params'),*/async (req, res, next)=>{
        const {movieId} = req.params;
        try{
            const movie = await moviesService.getMovie( { movieId } );
            console.log("El valor de movie id es", movie);
            res.status(200).json(
                {
                    data:movie,
                    message:'movies retrieved'
                }
            );
        }catch(err)
        {
            next(err);
        }
    });

    /**Ruta post, crea una nueva movie*/
    // mandamos el esquema {createMovieSchema}, de donde sale 'body'
    router.post("/", validationHandler( { createMovieSchema}) , async (req, res, next)=>{
                
        //const moviesData= req.body;
        const { body:movie } = req;  //obtenemos el cuerpo pero erecuerda que se manda en diferentes foramtos, puede ser www-format que son pares de valores o raw que es un texto plano o json y se puede atrapar tal cual, le ponemos alias movie.

        try{
            const createdMovieId = await moviesService.createMovie({movie});
            
            res.status(201).json(
                {
                    data: createdMovieId,
                    message:'movie retrieve'
                }
            );
        }catch(err)
        {
            next(err);
        }
    });

    /**Ruta put:/id Actualiza una nueva povie */
    //podemos agregar mas de un middleware, uno verifica el movieID y el otro el cuerpo de la pelicula en caso que se envie pues no son reqeridos
    router.put("/:movieId", /*validationHandler( { movieId: movieIdSchema}, 'params') ,validationHandler( { updateMovieSchema}, 'body') , */async (req, res, next)=>{
        const {movieId} = req.params; //Par saber cual actualizar, recuerda que como es desstructuración entonces se deben llamar igual tanto|   la ruta /:movieId como cuando obtenemos el valor
        const { body:movie } = req; 
        try{

            
            const updatedMovieId = await moviesService.updateMovie({movieId, movie});  //porque entre {}

            res.status(200).json(
                {
                    data: updatedMovieId,
                    message:'movies updated'
                }
            );
        }catch(err)
        {
            next(err);
        }
    });

    /**Ruta delete:/id elimina la que cumple con el id */
    router.delete("/:movieId",/* validationHandler( { movieId: movieIdSchema}, 'params') , */async (req, res, next)=>{
        const { movieId}  = req.params;

        try{
            const deletedMovieId = await moviesService.deleteMovie({movieId});
            
            res.status(200).json(
                {
                    data:deletedMovieId,
                    message:'movie deleted'
                }
            );
        }catch(err)
        {
            next(err);
        }
    });
} //fin de moviesApi

module.exports={
    moviesApi
}
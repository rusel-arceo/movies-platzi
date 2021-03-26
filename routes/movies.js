const express=require('express');

const {moviesMock} = require('../utils/mocks/movies');

const moviesApi=(app)=>{
    const router = express.Router();
    app.use('/api/movies', router);

    /**Ruta get lista todos */
    router.get("/", async (req, res, next)=>{
        try{
            const movies = await Promise.resolve(moviesMock);
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
    router.get("/:movieId", async (req, res, next)=>{
        try{
            const movies = await Promise.resolve(moviesMock);
            res.status(200).json(
                {
                    data:movies[0],
                    message:'movies retrieved'
                }
            );
        }catch(err)
        {
            next(err);
        }
    });

    /**Ruta post, crea una nueva movie*/
    router.post("/", async (req, res, next)=>{
        try{
            const createMovieId = await Promise.resolve(moviesMock[0].id);
            
            res.status(201).json(
                {
                    data: createMovieId,
                    message:'movie retrieve'
                }
            );
        }catch(err)
        {
            next(err);
        }
    });

    /**Ruta put:/id Actualiza una nueva povie */
    router.put("/:id", async (req, res, next)=>{
        try{
            const updatedMovieId = await Promise.resolve(moviesMock[0].id);
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
    router.delete("/:id", async (req, res, next)=>{
        try{
            const deletedMovieId = await Promise.resolve(moviesMock[0].id);
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
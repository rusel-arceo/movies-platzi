//const { moviesMock }= require ('../utils/mocks/movies');
const { MongoLib }= require('../lib/mongo');

class MoviesService{
    constructor()
    {
        this.collection = 'movies'; //La collección será movies pero aun no está definida
        this.mongoDB = new MongoLib();
    }

    async getMovies( tags )  //Recuerda que {algo} desestrutura objeto pero si no tiene valor marca error
    {
        //const movies= Promise.resolve(moviesMock); ahpra implementaremos la peticion a mongo y ya no usaremos estos mock de prueba
        const query = tags && { tags: { $in: tags}}; //Revisar investigar
        console.log("Lo que imprime tags", query)
        const movies= await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({movieId})
    {
        //const movie = await Promise.resolve(moviesMock[0]);
        const movie = await this.mongoDB.getById(this.collection,movieId);
        console.log("El valor de retorno de movie desde el service", movie);
        return movie || {};
    }

    async createMovie({ movie })
    {
        //const createMovieId = await Promise.resolve(moviesMock[0].id);
        const createMovieId = await this.mongoDB.create(this.collection, movie);
        return createMovieId;
    }

    async updateMovie({movieId,movie} = {}){ //Hacemos que por defecto sea un objeto,vacío supongo que por si no se mandan los parametros pero esto se debería verificar con un middleware
        //const updatedMovieId = await Promise.resolve(moviesMock[0].id);
        console.log("El id desde el service para update", movieId);

        const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        console.log("El valor de updateMoviedID desoues en el update", movieId);
        return updatedMovieId;
    }

    async deleteMovie({movieId})
    {
        const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
        return deletedMovieId;
    }
}

module.exports= MoviesService;
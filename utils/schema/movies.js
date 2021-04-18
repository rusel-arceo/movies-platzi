const joi = require('@hapi/joi');

/*creamos un esquema para cada servicio o conjunto de serivicio*/
//.regex verifica la expresión regular, para el id de mongo es un alfanumerico de 24 caracteres, el string que sea string
//const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]$/);
const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);  //Es cuando se lanzó la primera peli según.
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema =  joi.string().max(300); 
const movieDurationSchema =  joi.string().min(1).max(300); 
const movieContentRatingSchema = joi.string().max(5);
const movieSourceSchema = joi.string().uri(); 

//Es un array, especificamos que cada items es string con un maximo de 50 caracterres
const movieTagsSchema = joi.array().items( joi.string().max(50) ); 

const createMovieSchema =joi.object({
    title: movieTitleSchema.required(),
    year: movieYearSchema.required(),
    cover: movieCoverSchema.required(),
    description: movieDescriptionSchema.required(),
    duration: movieDurationSchema.required(),
    contentRating: movieContentRatingSchema.required(),
    source: movieSourceSchema.required(),
    tags: movieTagsSchema,
});

const updateMovieSchema = joi.object(
{
    title: movieTitleSchema,
    year: movieYearSchema,
    cover: movieCoverSchema,
    description: movieDescriptionSchema,
    duration: movieDurationSchema,
    contentRating: movieContentRatingSchema,
    source: movieSourceSchema,
    tags: movieTagsSchema,

});

// const testSchema = joi.object( {
//     year: joi.number().required(),
// });

module.exports = {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema,
    //testSchema
}
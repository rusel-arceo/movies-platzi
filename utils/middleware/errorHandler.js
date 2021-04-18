/**Estos middlewares son para manejo de errores, se agregan a express con app.use(moddleware) y serán disparados de forma automatica ante un error. van llamados siempre   y al usar next(error), cambian de un middleware a otro*/
const {config} = require('../../config'); //para saber si estamos en produccion o desarrollo y cargar el stack (dev) o no

function withErrorStack(error, stack) //Estono es NO es un middleware, es un funcionalidad para decidir si es dev o production
{
    if(config.dev)
    {
        
        return {error, stack};
        // return {message:'Entro al dev'};
    }
    // return {message:'No Entro al dev'};
    return error;
}

function logErrors(err, req, res, next)
{
    console.log(err);
    next(err); //llama al siguiente middleware que maneja errores
}

function errorHandler(err, req, res, next)
{
    res.status(err.status || 500);
    res.json(withErrorStack(err.message, err.stack));
}

module.exports = {
    logErrors,
    errorHandler
}
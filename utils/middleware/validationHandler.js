const joi = require('@hapi/joi');


let validate= (data, schema)=>{
    console.log('data', data);
    console.log(schema);
    //const { error } = joi.validate(data, schema); //es la funcion validate del joi que revisará que la data cumpla con lo definido en el esquema, lo cual implemetaremos en otro archivo    
    const { error } = schema.validate(data); 
    
    console.log("El error desde validade", error);
    return error;
}

let validationHandler = (schema, check='body')=>
{
    return (req, res, next) => {
        const error = validate(req[check], joi.object(schema));
        console.log("El error en validationHandler --->", error);
        (error) ? next( new Error ( error )): next();
    }
}

module.exports = validationHandler;
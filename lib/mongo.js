/**Creamos nuestra conexión de mongo */
const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index'); //Es la confiuración de los puertos y las credenciales

/*creamos las constantes*/

//el encondeUriComponet es para que en caso de tener caracteresz especiales no haya problema enla conexion 
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

//Mongodeb no requiere configurar el puerto para la base de datos, pero como un estandar es mejor para no tener problemas al cambiar de servicio

//En mongo atlas-- en conect - aplicación con driver mongoDB esta el generico. 
//mongodb+srv://<username>:<password>@cluster0.cbsyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
//const MONGO_URI = `mongodb://localhost:27017` para conexión local

class MongoLib {
    constructor() {

        //definimos nuestra cliente con la URI
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifieldTopology: true });
        this.dbName = DB_NAME; //el nombre de la base de datos
    }

    /**Aquí usaremos el patrón singletón */
    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => { //Es el cliente creado, si manda error llama el callback
                    if (err) {
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                }); //connect
            }); //promise
        }//if
        return MongoLib.connection;
    }//connect

    /**Implementación de acciones */

    //Se le pasará la colección con la intención que la libreria funciones con cualwuier coleccion, no solo con la de peliculas 
    getAll(collection, query) {
        return this.connect().then(db => {  //EL connect es una promesa, así si tenemos una respuesta favorable en la conexión entones hacemos para conseguir los datos. por lo que entiendo tambien podría ser con await
            return db.collection(collection).find(query).toArray();
            //con db hacemos que retorne la promesa, el pasamos la colleción, el find busca con un query opcional y con toArray() se pasa a arreglo para poder manejarlo como tipo JSON
        });

    } //el query serán los filtros

    getById(collection, id) {
        return this.connect().then(db => {  //EL connect es una promesa, así si tenemos una respuesta favorable en la conexión entones hacemos para conseguir los datos. por lo que entiendo tambien podría ser con await

            //construimos el query pasandole busqueda por _id: lo 'envolvemos' con objectId(id) y devolvera un objeto, si lo encuentra.
            //return db.collection(collection).findOne({ _id: Types.ObjectId(id) });
            return db.collection(collection).findOne({ _id: ObjectId(id) });

        });
    }

    create(collection, data) {
        return this.connect().then(db => {  //EL connect es una promesa, así si tenemos una respuesta favorable en la conexión entones hacemos para conseguir los datos. por lo que entiendo tambien podría ser con await

            //inserta un nuevo registro con la data
            return db.collection(collection).insertOne(data);

        }).then(result => result.insertedId); //el connect() va a devolver una promesa por eso lo capturamos y regresamos solamente el insertedId que es el que queremos.
    } //la data de la pelicula

    update(collection, id, data) {
        return this.connect().then(db => {  //EL connect es una promesa, así si tenemos una respuesta favorable en la conexión entones hacemos para conseguir los datos. por lo que entiendo tambien podría ser con await

            //return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true }).then(result => result.upsertedId || id); //Puede ser una insercion o actualización, por eso devolveremos el upsertedId, si no existe entonces lo crea por eso devolveremos el id, con $set decimos que en su caso actialice,upsert es para que decida si actualiza o inserta
            console.log("el ide que llega al update", id);
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true }).then(result => result.upsertedId || id);

        }); //de la promesa
    } //fin de update

    //la data parra update, el id
    delete(collection, id) {
        return this.connect().then(db => {  //EL connect es una promesa, así si tenemos una respuesta favorable en la conexión entones hacemos para conseguir los datos. por lo que entiendo tambien podría ser con await
            return db.collection(collection).deleteOne({ _id: ObjectId(id) })
        }).then(() => id);
    } //el id para borrar


}

module.exports = {
    MongoLib
}


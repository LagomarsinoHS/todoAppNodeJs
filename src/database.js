//Encargado de tener la conexion a la base de datos
const mongoose = require("mongoose")

const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST, MONGODB_BD } = process.env
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}${MONGODB_HOST}/${MONGODB_BD}?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
     useNewUrlParser: true,
      useCreateIndex:true //Estas 2 configuraciones las pide mongoose o al tratar de conectar dará warnings
    //La ultima es para evitar un warning de deprecado "collection.ensureIndex"
})
    .then(db => console.log("Base de Datos conectada!"))
    .catch(err => console.log(err))
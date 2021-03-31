require("dotenv").config() // Le indico que lo primero que haga al iniciar es TRAER el contenido del .env
const app = require("./server")
require ("./database"); //Con esto agarra la conexion de la bd y funciona


app.listen(app.get("port"), () => { //app.get busca el valor de app definido en server.js
    console.log(`Server corriendo en puerto`, app.get("port"))
})
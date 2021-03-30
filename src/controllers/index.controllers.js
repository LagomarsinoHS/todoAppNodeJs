/*
Crearé un objeto donde le comienzo a agrear sus propiedades. Finalmente exporto el objeto y este lo requerire en mi
index.routes.js donde llamaré a la funcion correspondiente dependiendo de a donde quiere ir la web
*/
const indexController = {};

indexController.renderIndex = (req, res) => {
    res.render("index")
};
indexController.renderAbout = (req, res) => {
    res.render("about")
};

module.exports = indexController;
const express = require("express")
const router = express.Router()

const render = require("../controllers/index.controllers")//Importo el objeto con las acciones que quiero que haga cada ruta

router.get("/", render.renderIndex);

router.get("/about", render.renderAbout);

module.exports = router;
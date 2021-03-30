//Archivo para tener solo el codigo de express
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//Inicializaciones
const app = express();
require("./config/passport")

//Configuraciones
app.set("port", process.env.PORT || 4000)
app.set("views", path.join(__dirname, "views")) //__dirname Le indica la carpeta donde estas parado, Path sirve para concatenar rutas sin problemas
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"), //Carpeta donde estaran los layouts
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs" //puede ser hbs o handlebars
}))
app.set("view engine", ".hbs")

//Middlewares
app.use(express.urlencoded({ extended: false })) // Se le dice al servidor que cada vez que lleguen datos de un formulario los transforme a JSON
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())//Esto debe estar despues de session
app.use(passport.session())
app.use(flash())//Permite que en las rutas, en el req, se agregue un nuevo campo llamado flash que contendrá un par de cosas que definí en notes.controller

//Variables Globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg"),//aqui rescato la variable que cree y se la asigno a res.locals.nombreVariableCreada
        res.locals.error_msg = req.flash("error_msg"),
        res.locals.error = req.flash("error"),
        res.locals.user = req.user || null
    next()//Esto es necesario, le indicas que despues de que haga la definicion de la variable, siga con el resto de sus cosas
})

//Rutas
app.use(require("./routes/index.routes")) //Le indico que para las rutas utiilizará el archivo index.routes
app.use(require("./routes/notes.routes"))
app.use(require("./routes/users.routes"))
//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")))//express.static es para indicarle desde donde tiene que tomar los archivos publicos, estaticos


module.exports = app;
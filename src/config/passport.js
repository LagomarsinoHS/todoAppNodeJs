const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/Users")

//Le paso los campos que guardará la sesión
//Login es el nombre que utilizara para indicar que tiene que usar este
passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
    //y aqui hago las validaciones que quiera
}, async (email, password, done) => {

    //Ver si existe el correo del usuario
    const user = await User.findOne({ email })
    if (!user) {
        return done(null, false, { message: "Usuario no encontrado" })
    } else {
        //Verificar contraseña
        const match = await user.decryptPassword(password)
        if (match) {
            //En el caso que todo este correcto, retorna el usuario
            return done(null, user)
        } else {
            return done(null, false, { message: "Contraseña incorrecta." })
        }
    }
}))

//Cuando el usuario sea logeado se guardara en la sesion del servidor
//Esta función pide 2 datos, el usuario (linea 11) y una funcion done
//La función done pide 3 parámetros, si hay un error, y la clave con que verificaremos al usuario, en este caso id
passport.serializeUser((user, done) => {
    done(null, user._id)
})

//Aqui lo que intenta hacer mientras se navega es que busca si el id puede estar en la url de momento
//esta funcion pide 2 parámetros, el id y la funcion done
passport.deserializeUser((id, done) => {
    //Entonces, por cada viaje de la url buscaremos al usuario en bd, por eso tenemos una callback final, el primero es error y el otro el usuario
    //si no existe el usuario retornara error, si existe, el usuario.
    User.findById(id, (err, user) => {
        done(err, user)
    })
})


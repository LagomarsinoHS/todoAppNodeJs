
const helpers = {}

//Esta funcion sirve debido a lo que se agrego con el passport, si se logea passport le agrega una propiedad al REQ, que viene siendo el "isAuthenticated"
//en ese caso  creo la funcion con el req, res y next donde next hace referencia a que siga a lo que deberia hacer despues de que fue llamada esta en caso de que todo este OK
//En el caso de que isAuthenticated sea false significa que no esta logeado y por ende lo redireccionaremos y mandaremos un mensaje de error
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error_msg", "No tienes acceso a esta página si no estas logeado.")
    res.redirect("/users/signin")
}

module.exports = helpers
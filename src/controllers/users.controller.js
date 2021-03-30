const userController = {};
const User = require("../models/Users");
const passport = require("passport");


userController.renderSignUpForm = (req, res) => {
    res.render("users/signUp")
};

userController.signUp = async (req, res) => {
    const errors = [];
    const { name, email, password, confirmPassword } = req.body
    if (password != confirmPassword) {
        errors.push({ text: "Contraseñas no coinciden" })
    }
    if (password.length < 4) {
        errors.push({ text: "Contraseña demasiado corta" })
    }
    if (errors.length > 0) {
        res.render("users/signup", { errors, name, email })
    }
    else {
        const userEmail = await User.findOne({ email: email })//En los parámetros tiene que ser un objeto con la información que quieres buscar, en este caso campo email
        if (userEmail) {
            req.flash("error_msg", "Correo en uso, favor elegir otro.") //Recuerda que aqui creo un key:value que se disponibilizara en server.js variables globales
            res.redirect("/users/signup", { name, password })
        } else {
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash("success_msg", "Usuario Registrado con Exito!")
            res.redirect("/users/signin")
        }
    }
};

userController.renderSignInForm = (req, res) => {
    res.render("users/signIn")
};

userController.signIn = passport.authenticate("login", {
    failureRedirect: "/users/signin",
    successRedirect: "/notes",
    failureFlash: true
})

userController.logOut = (req, res) => {
    req.logout()//Funcion que passport integro al req
    req.flash("success_msg", "Deslogeado con exito!")
    res.redirect("/users/signin")
}

module.exports = userController;
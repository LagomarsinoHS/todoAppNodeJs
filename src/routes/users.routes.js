const { Router } = require("express");
const router = Router();

const {
    logOut,
    renderSignInForm,
    renderSignUpForm,
    signIn,
    signUp
} = require("../controllers/users.controller");

//Registrar usuario
router.get("/users/signup", renderSignUpForm);
router.post("/users/signup", signUp);

//Login de usuario
router.get("/users/signin", renderSignInForm);
router.post("/users/signin", signIn);

//Logout de usuario
router.get("/users/logout", logOut);

module.exports = router;
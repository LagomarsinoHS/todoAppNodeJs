const { Router } = require("express");
const router = Router();
const { renderNoteForm,
    createNewNote,
    renderAllNotes,
    renderEditForm,
    updateNote,
    deleteNotes
} = require("../controllers/notes.controller");
const { isAuthenticated } = require("../helpers/auth") //Traigo la funcion que valida si esta logeado o no, y esta se agrega en las rutas que quiero protefer
//Entonces es (la ruta, la funcion validadora, y si todo sale bien avanza a lo que tiene que hacer)

//Get all notes
router.get("/notes", isAuthenticated, renderAllNotes);

//New note
router.get("/notes/add", isAuthenticated, renderNoteForm); //Esa ruta me envia a un formulario
router.post("/notes/new-note", isAuthenticated, createNewNote);//el formulario tiene el metodo post con destino aqui

//Edit note
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.put("/notes/edit/:id", isAuthenticated, updateNote);

//Delete note
router.delete("/notes/delete/:id", isAuthenticated, deleteNotes)

module.exports = router;
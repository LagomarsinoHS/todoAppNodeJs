const { Router } = require("express");
const router = Router();
const { renderNoteForm,
    createNewNote,
    renderAllNotes,
    renderEditForm,
    updateNote,
    deleteNotes
} = require("../controllers/notes.controller");

//Get all notes
router.get("/notes", renderAllNotes);

//New note
router.get("/notes/add", renderNoteForm); //Esa ruta me envia a un formulario
router.post("/notes/new-note", createNewNote);//el formulario tiene el metodo post con destino aqui

//Edit note
router.get("/notes/edit/:id", renderEditForm);
router.put("/notes/edit/:id", updateNote);

//Delete note
router.delete("/notes/delete/:id", deleteNotes)

module.exports = router;
const notesController = {}
const Notes = require("../models/Notes");


notesController.renderNoteForm = (req, res) => {
    res.render("notes/newNotes") //Renderiza lo que esta en notes/newNotes
};

notesController.createNewNote = async (req, res) => {
    try {
        const { title, description } = req.body
        const newNote = new Notes({ title, description }) // Creo una instancia de Note, le doy sus valores
        await newNote.save() // Uso la propiedad Save del modelo y esto intenta guardar en la bd
        req.flash("success_msg", "Nota Agregada!")
        res.redirect("/notes")
    } catch (error) {
        const { message: motivoError } = error.errors.description.properties
        const { _message } = error
        console.log(motivoError, _message)
    }
};

notesController.renderAllNotes = async (req, res) => {
    const allNotes = await Notes.find().lean()
    res.render("notes/allNotes", { allNotes })
};

notesController.renderEditForm = async (req, res) => {
    const { title, description, _id } = await Notes.findById(req.params.id)
    console.log(title, description, _id)
    res.render("notes/editNote", { title, description, _id })
};

notesController.updateNote = async (req, res) => {
    console.log(req.body)
    const { title, description } = req.body
    await Notes.findByIdAndUpdate(req.params.id, { title, description })
    req.flash("success_msg", "Nota Modificada!") //Con esto creo una variable de alerta con su mensaje y la MUESTRO antes de renderizar a la otra pagina, esto esta definido en server.js variables globales
    res.redirect("/notes")
};

notesController.deleteNotes = async (req, res) => {
    console.log("Id", req.params.id)
    await Notes.findByIdAndDelete(req.params.id)
    req.flash("success_msg", "Nota Eliminada!!")
    res.redirect("/notes")
};



module.exports = notesController;
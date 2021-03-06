const mongoose = require("mongoose")
const SCHEMA = mongoose.Schema

//Esta es una forma de crear un modelo, en el otro (Users) la creare de otra forma
const Notes = new SCHEMA({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String
    }
}, {
    timestamps: true //
})



module.exports = mongoose.model("Note", Notes)
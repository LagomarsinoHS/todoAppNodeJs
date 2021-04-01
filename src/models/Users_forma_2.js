const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;
const bcrypt = require("bcryptjs");

//ESTE ARCHIVO SOLO ES PARA MOSTRAR OTRA FORMA DE DECLARAR UN MODELO
//TOMAR EN CUENTA QUE SI EL MODELO TENDRÁ METODOS ASI NO FUNCIONA Y DEBE SER UTILIZADO COMO EL ORIGINAL
//ADEMÁS QUE NO ES BUENA PRACTICA METER FUNCIONES A LOS MODELOS

const Users = mongoose.model("User", new SCHEMA({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
}));

Users.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)//No es necesario poner el valor. Esto genera un Salt necesario para encriptar password
    return await bcrypt.hash(password, salt)
};

Users.methods.decryptPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = Users



/*
//!Esta es otra forma y mas comoda a mi parecer
const Users = mongoose.model("User", new SCHEMA({
    name: {type: String,required: true},
    mail: {type: String,required: true,unique: true},
    password: {type: String,required: true}
}, {
    timestamps: true
}));

Users.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
};


Users.methods.decryptPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

*/
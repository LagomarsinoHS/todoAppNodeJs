const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;
const bcrypt = require("bcryptjs");

const Users = new SCHEMA({
    name: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

Users.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)//No es necesario poner el valor. Esto genera un Salt necesario para encriptar password
    return await bcrypt.hash(password, salt)
};

//Al modelo users le creo una funcion que lo que hace es tomar como argumento la password que recibira y esta la comparara
//con la password que contiene el usuario, retorna true o false si concuerdan
//*dato: En este caso pasa hacer referencia al password del modelo tenemos que usar la function clasica y asi usar el this.
Users.methods.decryptPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = mongoose.model("User",Users)



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
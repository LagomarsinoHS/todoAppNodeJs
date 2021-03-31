const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const Users = new SCHEMA({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", Users)



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
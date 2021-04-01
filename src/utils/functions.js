const bcrypt = require("bcryptjs");

const decryptPassword = async function (userPassword,bdPassword) {
    return await bcrypt.compare(userPassword, bdPassword)
};
const encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)//No es necesario poner el valor. Esto genera un Salt necesario para encriptar password
    return await bcrypt.hash(password, salt)
};

module.exports = {
    decryptPassword,
    encryptPassword
}
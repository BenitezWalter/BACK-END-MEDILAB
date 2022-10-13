const User = require("../models/User");
const bcrypt = require("bcrypt");
const generarJWT = require("../helpers/generar-jwt");

const ctrlAuth = {};

ctrlAuth.iniciarSesion = async (req, res) => {
  const { user, password } = req.body;

  try {
    const usuario = await User.findOne({ user });

    if (!usuario) {
      return res.json({
        ok: false,
        msg: "No se puede autenticar, usuario no encontrado",
      });
    }

    if (!usuario.isActive) {
      return res.json({
        ok: false,
        msg: "No se puede autenticar, usuario inactivo",
      });
    }

    const passwordCorrect = bcrypt.compareSync(password, usuario.password);

    if (!passwordCorrect) {
      return res.json({
        ok: false,
        msg: "No se puede autenticar, password incorrecto",
      });
    }

    //SI PASA LAS VALIDACIONES EL TOKEN SE GENERA Y SE MUESTRA
    console.log("LLEGUE ACA");
    // Generar el token
    const token = await generarJWT({ uid:usuario.id });
    console.log({uid:usuario.id})
    return res.json({
      token
    });
  } catch (error) {
    return res.json({ msg: "ERROR AL GENERAR TOKEN" });
  }
};

module.exports = ctrlAuth;

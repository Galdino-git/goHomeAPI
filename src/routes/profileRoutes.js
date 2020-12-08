const express = require("express");
const mongoose = require("mongoose");
const Profile = mongoose.model("Profile");
const User = mongoose.model("User");
const Car = mongoose.model("Car");

const router = express.Router();

router.post("/profile/create", async (req, res) => {
  const {
    name,
    birthdate,
    cpf,
    photo,
    telephone,
    is_Driver,
    rating,
    cnh,
  } = req.body;

  try {
    const profile = new Profile({
      name,
      birthdate,
      cpf,
      photo,
      telephone,
      is_Driver,
      rating,
      cnh,
    });

    await profile.save();

    res.send({ profile });
  } catch (erro) {
    return res.status(422).send({ erro: erro.message });
  }
});

router.get("/profile/getByUserId", async (req, res) => {
  const { _id } = req.body;

  console.log(_id);
  const user = await User.findById({ _id }).catch((error) =>
    console.log(error.message)
  );

  if (!user) {
    return res.status(404).send({ erro: "Perfil não encontrado!" });
  }
  const profile = await Profile.findById({ _id: user._id_Profile });
  if (!profile) {
    return res.status(404).send({ erro: "Perfil não encontrado!" });
  }
  try {
    res.send(profile);
  } catch (erro) {
    return res.status(404).send({ erro: erro.message });
  }
});

router.get("/profile/getCarsbyProfileId", async (req, res) => {
  try {
    const { _id_Profile } = req.body;
    const car = await Car.find({ _id_Profile });

    if (!car) {
      return res.status(404).send({ erro: "Nenhum carro encontrado!" });
    }

    res.send({ car });
  } catch (erro) {
    return res.status(404).send({ erro: "Nenhum carro encontrado!" });
  }
});

router.patch("/profile/update", async (req, res) => {
  const {
    nome,
    dataNascimento,
    cpf,
    foto,
    telefone,
    tipo,
    cnh,
    crlv,
    rank,
  } = req.body;

  if (!cpf) {
    return res.status(404).send({ erro: "CPF não encontrado!" });
  }
  try {
    const profile = await Profile.findOneAndUpdate(
      { cpf },
      { nome, dataNascimento, foto, tipo, telefone, cnh, crlv, rank },
      {
        new: true,
      }
    );
    res.send({ profile });
  } catch (erro) {
    return res.status(404).send({ erro: "CPF não encontrado!" });
  }

  res.sen;
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const Profile = mongoose.model("Profile");
const Car = mongoose.model("Car");

const router = express.Router();

router.post("/signup", async (req, res) => {
  //Cadastrar
  try {
    const {
      email,
      password,
      _id_Secret_Question,
      secret_Answer,
      _id_Profile,
    } = req.body;
    const user = new User({
      email,
      password,
      _id_Secret_Question,
      secret_Answer,
      _id_Profile,
    });
    await user.save();

    //const token = jwt.sign({ userId: user._id }, "GO_HOME_TCC");
    const token = user._id;

    res.send({ token });
  } catch (erro) {
    return res.status(422).send(erro.message);
  }
});

router.post("/signin", async (req, res) => {
  //Logar
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ erro: "É necessário informar um email e uma senha para logar." });
  }
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(404).send({ erro: "Email ou senha inválidos." });
  }

  const profile = await Profile.findById({ _id: user._id_Profile });

  const car = await Car.findOne({ _id_Profile: profile._id });

  try {
    //const token = jwt.sign({ userId: user._id }, "GO_HOME_TCC");
    const token = user._id;

    res.send({ token: token, profile: profile, user: user, car: car });
  } catch (erro) {
    return res.status(401).send({ erro: "Email ou senha inválidos." });
  }
});

router.post("/signin2", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ erro: "Email inválido." });
  }

  try {
    //const token = jwt.sign({ userId: user._id }, "GO_HOME_TCC");
    const token = user._id;
    res.send({ token });
  } catch (erro) {
    return res.status(401).send({ erro: "Email inválido." });
  }
});

router.get("/user/recover", async (req, res) => {
  const { email, _id_Secret_Question, secret_Answer } = req.body;
  if (!email || !_id_Secret_Question || !secret_Answer) {
    return res.status(422).send({
      erro: "É necessário enviar todas informações para recuperar a senha.",
    });
  }

  const user = await User.find({
    email,
    _id_Secret_Question,
    secret_Answer,
  });

  try {
    if (!user) {
      return res.status(404).send({ erro: "Nenhum usuário encontrado." });
    }
    //const token = jwt.sign({ userId: user._id }, "GO_HOME_TCC");
    const token = user._id;
    res.send({ user });
  } catch (error) {
    return res.send(error.message);
  }
});

router.get("/user/get", async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findById({ _id: _id }).catch((error) =>
      console.log(error.message)
    );

    res.send({ user });
  } catch (error) {
    return res.status(404).send({ erro: erro.message });
  }
});

router.patch("/user/update", async (req, res) => {
  const {
    email,
    password,
    _id_Secret_Question,
    secret_Answer,
    _id_Profile,
  } = req.body;

  const user = await User.findOneAndUpdate({});
});

router.patch("/user/updatePassword", async (req, res) => {
  const { email, password, newpassword } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ erro: "É neceesário informar o email e senha." });
  }

  if (password === newpassword) {
    return res.status(400).send({ erro: "A nova senha deve ser diferente." });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { password: newpassword },
      {
        new: true,
      }
    );
    res.send({ user });
  } catch (erro) {
    return res.status(401).send({ erro: erro.message });
  }
});

module.exports = router;

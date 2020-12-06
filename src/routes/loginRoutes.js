const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

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

    const token = jwt.sign({ userId: user._id }, "GO_HOME_TCC");

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
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ erro: "Email ou senha inválidos." });
  }

  try {
    //jwt.sign({ userId: user._id }, "GO_HOME_TCC");
    res.send({ user });
  } catch (erro) {
    return res.status(401).send({ erro: "Email ou senha inválidos." });
  }
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

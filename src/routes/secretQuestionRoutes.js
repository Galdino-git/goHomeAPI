const express = require("express");
const mongoose = require("mongoose");
const SecretQuestion = mongoose.model("Secret_Question");

const router = express.Router();

router.post("/secretquestion/create", async (req, res) => {
  try {
    const { question } = req.body;
    const secretquestion = new SecretQuestion({ question });
    await secretquestion.save();

    res.send({ secretquestion });
  } catch (erro) {
    return res.status(422).send(erro.message);
  }
});

router.get("/secretquestion/read", async (req, res) => {
  const secretQuestions = await SecretQuestion.find();
  res.send(secretQuestions);
});

router.delete("/secretquestion/delete", async (req, res) => {
  try {
    const { _id } = req.body;
    await SecretQuestion.deleteOne({ _id });
    const testDelete = await SecretQuestion.findOne({ _id });
    if (testDelete) {
      res.send("Algo deu errado na tentativa de exclusão da pergunta.");
    }
  } catch (erro) {
    res.send(erro.message);
  }
});

module.exports = router;

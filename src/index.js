require("./models/User");
require("./models/Profile");
require("./models/Secret_Question");
require("./models/Car");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/loginRoutes");
const profileRoutes = require("./routes/profileRoutes");
const carRoutes = require("./routes/carRoutes");
const secretQuestionRoutes = require("./routes/secretQuestionRoutes");
const requireAuth = require("./middleware/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(loginRoutes);
app.use(profileRoutes);
app.use(secretQuestionRoutes);
app.use(carRoutes);

const mongoUri = `mongodb+srv://sysDBA:${encodeURIComponent(
  "!#homeDBA#!"
)}@gohome.oqsjk.mongodb.net/goHome?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("CONECTADO");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting do mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Você está logado como: ${req.user.email}`);
});

app.listen(3010, () => {
  console.log("Listening to port 3010");
});

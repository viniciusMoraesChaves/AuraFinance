const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "API do AuraFinance rodando" });
});

module.exports = app;
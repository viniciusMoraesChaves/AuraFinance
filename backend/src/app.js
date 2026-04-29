const express = require("express");
const app = express();

const authRoutes = require('./routes/authRoutes')
const transacaoRoutes = require('./routes/transacaoRoutes')
const objetivoRoutes = require('./routes/objetivoRoutes')

app.use(express.json());

app.use('/auth', authRoutes)
app.use('/transacoes', transacaoRoutes)
app.use('/objetivos', objetivoRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "API do AuraFinance rodando" });
});

module.exports = app;
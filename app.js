require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = process.env.PORT
const router = require('./src/router/router')
const methodOverride = require('method-override')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(methodOverride('_method'))
app.use(router)

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log(' Conectado ao MongoDB'))
  .catch(err => console.error(' Erro ao conectar no MongoDB:', err));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rondando na porta ${PORT}`)
})
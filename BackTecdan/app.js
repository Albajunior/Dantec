const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./App/Models/db.js');
const router = require("./App/Routes/index.js");
const bodyParser = require('body-parser');


// Middleware pour parser les données JSON
app.use(bodyParser.json());

//Ajout des routes
app.use(cors());
app.use(express.json());
app.use("/api", router);

module.exports = app;
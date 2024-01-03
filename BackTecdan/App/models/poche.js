// Import de Mongoose
const mongoose = require("mongoose");

// Création du schéma pour la collection
const PocheShema = new mongoose.Schema({
  Groupe: { type: String, required: [true, "why no name"] },
  Stock: { type: String, required: [true, "Required Field"] },

  createDate: { type: Date, required: [true, "why no Date"] },
});

PocheShema.pre("save", async function (next) {
  if (this.isModified("createDate")) {
    this.createDate = Date.now();
  }
  this.createDate = Date.now();
  next();
});

// Création du modèle pour la collection
const PocheSang = mongoose.model("PocheSang", PocheShema);
module.exports = PocheSang;

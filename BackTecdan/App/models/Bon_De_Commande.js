// Import de Mongoose
const mongoose = require("mongoose");

// Création du schéma pour la collection 
const BonShema = new mongoose.Schema({
  NomPatient: { type: String, required: [true, "Required Field"] },
  PrenomPatient: { type: String, required: [true, "Required Field"] },

  AgePatient: { type: String },

  sexe: { 
    type: String,
    enum: {
      values: ["M", "F"],
      message: " {VALUE} is not supported",
    },
    required: [true, "Required Field"],
  },

  Groupe_Sanguin: { type: String, required: [true, "why no amount"] },

  Degres_urgence: { type: String, required: [true, "Required Field"] },
  
  Nombre_Poche: { type: String, required: [true, "Required Field"] },

  Service: { type: String, required: [true, "Required Field"] },

  Numero_Salle: { type: String, required: [true, "Required Field"] },

  Etat: { type: Boolean, required: true, default: false },

  Nom_Medecin: {
    required: [true, "Required Field"],
    type: mongoose.Schema.Types.String,
    ref: "User",
  },
  
  Id_Medecin: {
    required: [true, "Required Field"],
    type: mongoose.Schema.Types.String,
    ref: "User",
  },
  
  createDate: { type: Date, required: [true, "why no Date"] },

});


BonShema.pre('save', async function(next) {
  if (this.isModified('createDate')) {
   this.createDate = Date.now();
  }
  next();
})

// Création du modèle pour la collection 
const Bon_Cmd = mongoose.model("Bon_Cmd", BonShema);
module.exports = Bon_Cmd;
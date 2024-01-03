// Import de Mongoose
const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

// Création du schéma pour la collection "users"
const userSchema = new mongoose.Schema({
  prenom: { type: String },
  nom: { type: String },
  createDate: { type: Date, required: [true, "why no Date"] },

  sexe: {
    type: String,
    enum: {
      values: ["M", "F"],
      message: " {VALUE} is not supported",
    },
    required: [true, "Required Field"],
  },
  telephone: { type: String, required: [true, "why no amount"] },
  specialite: { type: String },
  email: {
    type: String,
    required: [true, "Required Field"],
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: "Veuillez fournir une adresse e-mail valide",
    },
  },
  password: {
    type: String,
    required: [true, "Required Field"],
    validate: {
      validator: function (password) {
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(password);
      },
      message: "Veuillez fournir un password valide",
    },
  },
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

//hashPassword
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  //middleware Date

  this.createDate = Date.now();

  next();
});

// Création du modèle pour la collection "utilisateurs"
const User = mongoose.model("User", userSchema);

module.exports = User;

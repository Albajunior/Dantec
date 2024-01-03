const User = require("../Models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const payload = {
      prenom: req.body.prenom,
      nom: req.body.nom,
      sexe: req.body.sexe,
      telephone: req.body.telephone,
      specialite: req.body.specialite,
      email: req.body.email,
      password: req.body.password,
      createDate: Date.now(),
    }
    const user = new User(payload);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password }).exec();

    if (user === null) {
      //console.log("Not found!");
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    } else {
      console.log(user.email);

        console.log("login successful");

        const payload = {
          id: user.id,
          email: user.email,
          nom: user.nom,
        };

        const token = jwt.sign(payload, process.env.CLE, { expiresIn: "1h" });
        res.status(200).json({
          user: user,
          token: token,
        });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email, password: req.body.passwordd }).exec();

//     if (user === null) {
//       //console.log("Not found!");
//       return res.status(404).json({ error: "Utilisateur non trouvé" });
//     } else {
//       console.log(user.email);

//       const match = await bcrypt.compare(req.body.password, user.password);
//       //return match;

//       if (match) {
//         console.log("login successful");

//         const payload = {
//           id: user.id,
//           email: user.email,
//           nom: user.nom,
//         };

//         const token = jwt.sign(payload, process.env.CLE, { expiresIn: "1h" });
//         res.status(200).json({
//           user: user,
//           token: token,
//         });
//       } else {
//         return res.status(401).json({ error: " incorrect" });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ erreur: "Erreur lors de la récupération" });
//   }
// };

exports.readAll = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user === null) {
      return res.status(404).json({ error: "user non trouvé" });
    } else {
      await user.deleteOne({ _id: userId });
      res.status(204).json({ message: `Le User  ${userId} a été supprimé.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};

exports.update = async (req, res) => {
  const { prenom, nom, age, sexe, telephone, specialite, email } = req.body;
  try {
    const newUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      //  user: req.auth.userId,
      },
      {
        prenom, nom, age, sexe, telephone, specialite, email
      },
      { returnDocument: "after" }
    );

    if (!newUser) {
      return res.status(404).json({ error: "User non trouvé" });
    } else {
      res
        .status(200)
        .json({ message: `User  ${req.params.id} a été modifie.`, newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};

exports.findOne= async (req, res) => {
  try {
    const medecin = await User.findById(
      {
        _id: req.params.id,
      }
    );

    if (!medecin) {
      return res.status(404).json({ error: "User non trouvé" });
    } else {
      res
        .status(200)
        .json({ medecin });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};


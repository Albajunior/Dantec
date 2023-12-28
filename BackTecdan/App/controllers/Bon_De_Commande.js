const Bon_Cmd = require("../models/Bon_De_Commande");

exports.create = async (req, res) => {
    try {
      console.log(req.body);

      const payload = {
        NomPatient: req.body.NomPatient,
        PrenomPatient: req.body.PrenomPatient,
        age: req.body.Age,
        sexe: req.body.sexe,
        Groupe_Sanguin: req.body.Groupe_Sanguin,
        Degres_urgence: req.body.Degres_urgence,
        Nombre_Poche: req.body.Nombre_Poche,
        Service: req.body.Service,
        Numero_Salle: req.body.Numero_Salle,
        Nom_Medecin: req.auth.userName,
        createDate: Date.now()
      }
  
      const bon_Cmd = new Bon_Cmd(payload);
      await bon_Cmd.save();
      res.status(201).json(bon_Cmd);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: "Erreur lors de la récupération" });
    }
};

exports.readAll = async (req, res) => {
  try {
    const bon_Cmd = await Bon_Cmd.find({});
    res.status(200).json(bon_Cmd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};

exports.deleteBon_Cmd = async (req, res) => {
  try {
    const bon_CmdId = req.params.id;
    const bon_Cmd = await Bon_Cmd.findById(bon_CmdId);

    if (bon_Cmd === null) {
      return res.status(404).json({ error: "Bon_Cmd non trouvé" });
    } else {
      await bon_Cmd.deleteOne({ _id: bon_CmdId });
      res.status(204).json({ message: `Le Bon_Cmd  ${bon_CmdId} a été supprimé.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};


exports.update = async (req, res) => {
  const { NomPatient, PrenomPatient, Groupe_Sanguin, sexe, Degres_urgence, Nombre_Poche, Service, Numero_Salle, Etat } = req.body;
  try {
    const newBon_Cmd = await Bon_Cmd.findOneAndUpdate(
      {
        _id: req.params.id,
 
      },
      {
        NomPatient, PrenomPatient, Groupe_Sanguin, sexe, Degres_urgence, Nombre_Poche, Service, Numero_Salle, Etat
      },
      { returnDocument: "after" }
    );

    if (!newBon_Cmd) {
      return res.status(404).json({ error: "Bon_Cmd non trouvé" });
    } else {
      res
        .status(200)
        .json({ message: `Bon_Cmd  ${req.params.id} a été modifie.`, newBon_Cmd });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};

exports.findOne= async (req, res) => {
  try {
    const bon_Cmd = await Bon_Cmd.findById(
      {
        _id: req.params.id,
      }
    );

    if (!bon_Cmd) {
      return res.status(404).json({ error: "Bon_Cmd non trouvé" });
    } else {
      res
        .status(200)
        .json({ bon_Cmd });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: "Erreur lors de la récupération" });
  }
};


const Poche = require("../Models/poche");

exports.create = async (req, res) => {
    try {
      console.log(req.body);
      const poche = new Poche(req.body);
      await poche.save();
      res.status(201).json(poche);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: "Erreur lors de la récupération" });
    }
};

exports.readAll = async (req, res) => {
    try {
      const poche = await Poche.find({})
      res.status(200).json(poche);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: "Erreur lors de la récupération" });
    }
};

exports.update = async (req, res) => {
    const { Stock, createDate } = req.body;
    try {
      const newStock = await Poche.findOneAndUpdate(
        {
          _id: req.params.id,
   
        },
        {
          Stock, createDate
        },
        { returnDocument: "after" }
      );
  
      if (!newStock) {
        return res.status(404).json({ error: "Poche non trouvé" });
      } else {
        res
          .status(200)
          .json({ message: `Poche  ${req.params.id} a été modifie.`, newStock });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erreur: "Erreur lors de la récupération" });
    }
  };
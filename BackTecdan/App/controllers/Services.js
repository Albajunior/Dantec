// const  Category  = require("../models/category");

// exports.createCategory = async (req, res) => {
//     try {
//       console.log(req.body);
//       const category = new Category(req.body);
//       await category.save();
//       res.status(201).json(category);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ erreur: "Erreur lors de la récupération" });
//     }
// };

// exports.readAll = async (req, res) => {
//     try {
//       const category = await Category.find({})
//       res.status(200).json(category);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ erreur: "Erreur lors de la récupération" });
//     }
// };
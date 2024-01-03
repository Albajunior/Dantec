const express = require('express')
const router = express();

const userRoutes = require('./user.js') ;
const bonRoutes = require('./bon_De_Commande.js') ;
//const stockRoutes = require('./stock.js') ;

router.use("/auth", userRoutes);
router.use("/bon", bonRoutes);
//router.use("/stock", stockRoutes);

module.exports = router
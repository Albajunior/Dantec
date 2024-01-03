const express = require('express')
const router = express();

const userRoutes = require('./user.js') ;
const bonRoutes = require('./bon_De_Commande.js') ;
const pocheRoutes = require('./poche.js') ;

router.use("/auth", userRoutes);
router.use("/bon", bonRoutes);
router.use("/poche", pocheRoutes);

module.exports = router
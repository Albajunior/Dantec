const express = require('express')
const router = express();

const userRoutes = require('./user.js') ;
const bonRoutes = require('./bon_De_Commande.js') ;

router.use("/auth", userRoutes);
router.use("/bon", bonRoutes);
// router.use("/category", categoryRoutes);
// router.use("/compte", compteRoutes);

module.exports = router
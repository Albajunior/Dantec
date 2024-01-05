const express = require("express");
const router = express();
const bonCtrl = require("../controllers/Bon_De_Commande");
const auth = require("../Middleware/auth")

router.post("/create", auth, bonCtrl.create);
router.get("/readall", auth, bonCtrl.readAll);
router.get("/mesbon", auth, bonCtrl.mesBon);
router.get('/findOne/:id', auth, bonCtrl.findOne);
router.delete('/delete/:id', auth, bonCtrl.deleteBon_Cmd);
router.put('/update/:id', auth, bonCtrl.update);

module.exports = router;
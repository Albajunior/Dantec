const express = require("express");
const router = express();
const userCtrl = require("../controllers/user.js");

const auth = require("../Middleware/auth.js")

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/readall", auth, userCtrl.readAll);
router.get("/findOne/:id", auth, userCtrl.findOne);
router.delete('/delete/:id', auth, userCtrl.deleteUser);
router.put('/update/:id', auth, userCtrl.update);

module.exports = router;
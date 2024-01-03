const express = require("express");
const router = express();
const Ctrl = require("../Controllers/poche");
const auth = require("../Middleware/auth")

router.post("/create", auth, Ctrl.create);
router.get("/readall", auth, Ctrl.readAll);
router.put('/update/:id', auth, Ctrl.update);

module.exports = router;
let express = require("express");
let router = express.Router();
const db = require("../queries/habitatQueries.js");

router.get("/", db.getAllHabitats);
router.get("/:id", db.getHabitat);

router.post("/", db.addHabitat);

module.exports = router;
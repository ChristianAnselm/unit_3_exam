let express = require("express");
let router = express.Router();
const db = require("../queries/speciesQueries.js");

router.get("/", db.getAllSpecies);
router.get("/:id", db.getSingleSpecies);

router.post("/", db.addSpecies);

module.exports = router;
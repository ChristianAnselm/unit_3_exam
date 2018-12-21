let express = require("express");
let router = express.Router();
const db = require("../queries/sightingQueries.js");

router.get("/", db.getAllSightings);
router.get("/species/:id", db.getSSightings);
router.get("/researchers/:id", db.getRSightings);
router.get("/habitats/:id", db.getHSightings);

router.post("/", db.addSighting);

router.delete("/:id", db.deleteSighting);

module.exports = router;
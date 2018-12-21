let express = require("express");
let router = express.Router();
const db = require("../queries/researcherQueries.js");

router.get("/", db.getAllresearchers);
router.get("/:id", db.getResearcher);

router.post("/", db.addResearcher);

router.patch("/:id", db.updateResearcher);

router.delete("/:id", db.deleteResearcher)

module.exports = router;
let express = require("express");
let router = express.Router();
const db = require("../queries/taggingQueries.js");


router.get("/", db.getAllTaggings);
router.get("/:id", db.getTagging);
router.get("/researchers/:id", db.getRTaggings);
router.get("/animals/:id", db.getATaggings);

router.post("/", db.addTagging);

module.exports = router;
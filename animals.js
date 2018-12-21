let express = require("express");
let router = express.Router();
const db = require("../queries/animalQueries.js");

router.get("/", db.getAllAnimals);

router.get("/:id", db.getSingleAnimal);

router.post("/", db.addAnimal);

router.patch("/:id", db.updateAnimal);

router.delete("/:id", db.deleteAnimal);

module.exports = router;

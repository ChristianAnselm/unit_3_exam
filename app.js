const express = require('express');
const app = express();
const bp = require('body-parser');

const researchers = require("./routes/researchers.js");
const species = require("./routes/species.js");
const animals = require("./routes/animals.js");
const habitats = require("./routes/habitats.js")
const taggings = require("./routes/taggings.js")
const sightings = require("./routes/sightings.js")


app.use(bp.urlencoded({extended: false}));
app.use(bp.json());

app.use("/researchers", researchers);
app.use("/species", species);
app.use("/animals", animals);
app.use("/habitats", habitats);
app.use("/taggings", taggings);
app.use("/sightings", sightings);

app.get("*", (req, res) => {
    res.send('error');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
    
})
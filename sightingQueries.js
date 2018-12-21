const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/research_data");

const getAllSightings = (req, res, next) => {
    db.any("SELECT * FROM sightings").then(data =>{
        res.status(200)
        .json({
            status: 'success',
            message: 'got all sightings!',
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};

const getSSightings = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM sightings WHERE species_id = $1", [userId]).then((data) => {
        res.status(200)
        .json({
            status: 'success',
            message: "recieved species sighting",
            data: data
        })
    })
    .catch(err => next(err))
};

const getRSightings = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM sightings WHERE researcher_id = $1", [userId]).then((data) => {
        res.status(200)
        .json({
            status: 'success',
            message: "recieved researcher sighting",
            data: data
        })
    })
    .catch(err => next(err))
};

const getHSightings = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM sightings WHERE habitat_id = $1", [userId]).then((data) => {
        res.status(200)
        .json({
            status: 'success',
            message: "recieved species sighting",
            data: data
        })
    })
    .catch(err => next(err))
};

const addSighting = (req, res, next) => {
    db.none('INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES (${researcher_id}, ${species_id}, ${habitat_id})', req.body)
    .then(() => {
        res.status(200)
            .json({
                status: 'success',
                message: 'congrats new Sighting'
            })
    })
    .catch(err => next(err))
};

const deleteSighting = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.result("DELETE FROM sightings WHERE id=$1", [userId])
    .then(result => {
        res.status(200)
        .json({
            status: 'Success!!',
            message: 'Removed Sighting'
        })
    })
    .catch(err => next(err))
};

module.exports ={ getAllSightings, getSSightings, getRSightings, getHSightings, addSighting, deleteSighting }
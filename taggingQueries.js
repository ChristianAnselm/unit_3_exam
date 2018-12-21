const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/research_data");

const getAllTaggings = (req, res, next) => {
    db.any("SELECT * FROM taggings").then(data =>{
        res.status(200)
        .json({
            status: 'success',
            message: 'got all taggings!',
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};

const getTagging = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM taggings WHERE researcher_id = $1", [user_id]).then((data) => {
        res.status(200)
        .json({
            status: 'success!',
            message: "Received Tagging",
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};

const getRTaggings = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT researcher_id FROM taggings WHERE id = $1", [userId]).then((data) => {
        res.status(200)
        .json({
            status: 'success!',
            message: "Received Researcher Tagging",
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};


const getATaggings = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT animal_id FROM taggings WHERE id = $1", [userId]).then((data) => {
        res.status(200)
        .json({
            status: 'success!',
            message: "Received Animal Tagging",
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};

const addTagging = (req, res, next) => {
    db.none('INSERT INTO taggings(researcher_id) VALUES (${researcher_id})', req.body)
    .then(() => {
        res.status(200)
            .json({
                status: 'success',
                message: 'congrats new tag'
            })
    })
    .catch(err => next(err))
};

module.exports = { getAllTaggings, getTagging, getRTaggings, getATaggings, addTagging }
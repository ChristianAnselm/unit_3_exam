const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/research_data");

const getAllSpecies = (req, res, next) => {
    db.any("SELECT * FROM species").then(data =>{
        res.status(200)
        .json({
            status: 'success',
            message: 'got all species!',
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};

const getSingleSpecies = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM species WHERE id = $1", [userId]).then((data) => {
        res.status(200)
        .json({
            status: 'success!',
            message: "Received Species",
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
    })
};

const addSpecies = (req, res, next) => {
    db.none('INSERT INTO species(name, is_mammal) VALUES (${name}, ${is_mammal})', req.body)
    .then(() => {
        res.status(200)
            .json({
                status: 'success',
                message: 'congrats new species!'
            })
    })
    .catch(err => next(err))
};
module.exports = { getAllSpecies, getSingleSpecies, addSpecies }
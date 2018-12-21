const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/research_data");

const getAllHabitats = (req, res, next) => {
    db.any("SELECT * FROM habitats").then(data =>{
        res.status(200)
        .json({
            status: 'success',
            messgae: 'got all habitats!',
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
}

const getHabitat = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM habitats WHERE id = $1", [userId]).then((data) => {
        res.status(200)
        .json({
            status: 'success!',
            message: "Received Habitat!",
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    }) 
};

const addHabitat = (req, res, next) => {
    db.none('INSERT INTO habitats(category) VALUES (${category})', req.body)
    .then(() => {
        res.status(200)
            .json({
                status: 'success',
                message: 'congrats new habitat'
            })
    })
    .catch(err => next(err))
};

module.exports = { getAllHabitats, getHabitat, addHabitat }
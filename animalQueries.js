const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/research_data");

const getAllAnimals = (req, res, next) => {
    db.any("SELECT * FROM animals").then(data => {
        res.status(200)
        .json({
            status: 'success',
            message: 'got all animals!',
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
    })
};

const getSingleAnimal = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM researchers WHERE id = $1", [userId]).then(data => {
        res.status(200)
        .json({
            status: 'success!',
            message: "Received Researcher",
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};
  
const addAnimal = (req, res, next) => {
    db.none('INSERT INTO animals(species_id, nickname) VALUES (${species_id}, ${nickname})', req.body)
    .then(() => {
        res.status(200)
            .json({
                status: 'success',
                message: 'congrats new animal'
            })
    })
    .catch(err => next(err))
};

const updateAnimal = (req, res, next) => {
    db.none("UPDATE animals SET species_id=${species_id}, nickname=${nickname} WHERE id=${id}",{
        species_id: req.body.species_id,
        nickname: req.body.nickname,
        id: parseInt(req.params.id)
    })
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Researcher!'
        })
    })
    .catch(err => next(err))
}

const deleteAnimal = (req, res, next) => {
    let Id = parseInt(req.params.id);
    db.result("DELETE FROM animals WHERE id=$1", Id)
    .then(result => {
        res.status(200)
        .json({
            status: 'success',
            message: 'removed that animal'
        })
    })
    .catch(err => next(err))
};
module.exports = { getAllAnimals, getSingleAnimal, addAnimal, updateAnimal, deleteAnimal}
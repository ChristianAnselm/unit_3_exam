const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/research_data");

const getAllresearchers = (req, res, next) => {
    db.any("SELECT * FROM researchers").then(data =>{
        res.status(200)
        .json({
            status: 'success',
            message: 'got all users!',
            data: data
        })
    }).catch(err => {
        console.log(err);
        next();
        
    })
};

const getResearcher = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.one("SELECT * FROM researchers WHERE id = $1", [userId]).then((data) => {
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

const addResearcher = (req, res, next) => {
    db.none('INSERT INTO researchers(name, job_title) VALUES (${name}, ${job_title})', req.body)
    .then(() => {
        res.status(200)
            .json({
                status: 'success',
                message: 'congrats new user'
            })
    })
    .catch(err => next(err))
};

const updateResearcher = (req, res, next) => {
    db.none('UPDATE researchers SET name=${name}, job_title=${job_title} WHERE id=${id}',{
        name: req.body.name,
        job_title: req.body.job_title,
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

const deleteResearcher = (req, res, next) => {
    let userId = parseInt(req.params.id);
    db.result("DELETE FROM researchers WHERE id=$1", userId)
    .then(result => {
        res.status(200)
        .json({
            status: 'Success!!',
            message: 'Removed that loser'
        })
    })
    .catch(err => next(err))
}

module.exports = { getAllresearchers, getResearcher, addResearcher, updateResearcher, deleteResearcher }
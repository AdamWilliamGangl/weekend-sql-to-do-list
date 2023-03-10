const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
    let queryText = //Add SQL here;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log('Error inside out GET route @ tasks.router.js', error)
                res.sendStatus(500);
            })
});

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Inside of POST @ tasks.router.js, this is req.body:', newTask)
    let queryText = //Add SQL here;
        pool.query(queryText, [])
            .then(result => {
                res.sendStatus(201);
            })
            .catch(error => {
                console.log('Error inside out POST route @ tasks.router.js', error)
                res.sendStatus(500);
            })
});

router.put

router.delete



module.exports = router;
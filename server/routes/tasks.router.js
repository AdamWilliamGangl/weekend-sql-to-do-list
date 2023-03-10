const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

//GET request connection from client.js via server.js
router.get('/', (req, res) => {
    const queryText = //Add SQL here;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(error => {
                console.log('Error inside of GET route @ tasks.router.js', error)
                res.sendStatus(500);
            })
});

//POST request connection from client.js via server.js
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Inside of POST @ tasks.router.js, this is req.body:', newTask)
    const queryText = //Add SQL here;
        pool.query(queryText, [])
            .then(result => {
                console.log('Inside of POST @ tasks.router.js, successfully posted:', newTask)
                res.sendStatus(201);
            })
            .catch(error => {
                console.log('Error inside of POST route @ tasks.router.js', error)
                res.sendStatus(500);
            })
});

//POST request connection from client.js via server.js
router.put('/:id', (req, res) => {
    const idToMarkComplete = req.params.id;
    console.log('Inside of PUT @ tasks.router.js, this is req.params.id:', idToMarkComplete)
    const queryText = //Add SQL here;
        pool.query(queryText, [idToMarkComplete])
            .then(result => {
                console.log('Inside of PUT @ tasks.router.js, successfully put:', idToMarkComplete)
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('Error inside of PUT route @ tasks.router.js', error)
                res.sendStatus(500);
            })
});

//POST request connection from client.js via server.js
router.delete('/:id', (req, res) => {
    const idToDelete = req.params.id;
    console.log('Inside of DELETE @ tasks.router.js, this is req.params.id:', idToDelete)
    const queryText = //Add SQL here;
        pool.query(queryText, [idToDelete])
            .then(result => {
                console.log('Inside of DELETE @ tasks.router.js, successfully put:', idToDelete)
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('Error inside of DELETE route @ tasks.router.js', error)
                res.sendStatus(500);
            })
});


module.exports = router;
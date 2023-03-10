//Constants
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router =require('./routes/tasks.router.js');
const PORT = process.env.PORT || 5000;

//Apps
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'))

app.use('/tasks', router);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
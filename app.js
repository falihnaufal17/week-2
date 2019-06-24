require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 5000;

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.listen(port, () => {
    console.log(`\n App listening on port ${port} \n`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//Route endpoint
//get all data from database
app.get('/', (req, res) => {
    res.send('Hello! this is my first endpoint!');
});

//POST data
app.post('/', (req, res) => {
    const data = {
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        created_at: new Date(),
        updated_at: new Date()
    }

    conn.query('INSERT INTO user SET ?', data, (err, results) => {
        if (err) console.log(err);
        res.json(results);
    });
});

//PATCH
app.patch('/:userid', (req, res) => {
    const userid = req.params.userid;

    const data = {
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        updated_at: new Date()
    }

    conn.query('UPDATE user SET ? WHERE userid = ?', [data, userid], (err, results) => {
        if (err) console.log(err);
        res.json(results)
    })
});

//DELETE
app.delete('/:userid', (req, res) => {

});
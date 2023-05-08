const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();


const pool = mysql.createConnection({
  
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registrationtest'
});

//body-parser extracts the entire body portion of an 
//incoming request stream and exposes it on req.body.

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error registering new user');
        } else {
            res.status(200).send('New user registered successfully');
        }
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

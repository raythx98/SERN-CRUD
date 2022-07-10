const express = require('express');
const app = express();

const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'linksystem',
})

let j = 1;

app.post('/getlink', (req, res) => {
    const link = req.body.link;

    db.query(
        'INSERT INTO links (link, shortened_link) VALUES (?,?)', 
        [link, j++], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted Successfully")
            }
        }
    );
})

app.listen(3001, ()=> {
    console.log("Server running on port 3001");
});


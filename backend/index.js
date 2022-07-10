const express = require('express');
const app = express();
const cors = require('cors');
const {nanoid} = require("nanoid");

const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'linksystem',
})

app.use(cors());
app.use(express.json());

app.post('/getlink', (req, res) => {
    const link = req.body.link;

    // if exists in database, return

    // doesn't exist in database
    const short_link = nanoid();
    db.query(
        'INSERT INTO links (link, shortened_link) VALUES (?,?)', 
        [link, short_link], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(short_link)
            }
        }
    );
})

app.listen(3001, ()=> {
    console.log("Server running on port 3001");
});


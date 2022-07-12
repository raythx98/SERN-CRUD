const express = require('express');
const app = express();
const cors = require('cors');
const {nanoid} = require("nanoid");

const mysql = require('mysql');
const db = mysql.createConnection({
    // SQL located on local, not much security issues
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'linksystem',
})

const protocol = /^[a-z0-9]+:\/\//;
app.use(cors());
app.use(express.json());

app.post('/getlink', (req, res) => {
    const link = req.body.link;

    const short_link = nanoid(8);
    db.query(
        'INSERT INTO links (link, shortened_link) VALUES (?,?)', 
        [link, short_link], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
                res.send(short_link)
            }
        }
    );
})

app.get('/:shortUrl', (req, res) => {
    db.query("SELECT link FROM links WHERE shortened_link = (?) ORDER BY link_id DESC LIMIT 1",
    [req.params.shortUrl], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result && result.length > 0) {
                if (protocol.test(result[0].link)) {
                    console.log(result[0].link);
                    return res.redirect(result[0].link);
                } else {
                    console.log('//'+result[0].link);
                    return res.redirect('//'+result[0].link);
                }
                
            } else {
                return res.status(404).json('No url found');
            }
           
        }
    });
})

app.listen(3001, ()=> {
    console.log("Server running on port 3001");
});


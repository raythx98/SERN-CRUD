const {nanoid} = require("nanoid");
const router = require('express').Router();
var db = require('./database');

router.post('/', (req, res) => {
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

module.exports = router;
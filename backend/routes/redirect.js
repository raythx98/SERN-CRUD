const router = require('express').Router();
const protocol_regex = /^[a-z0-9]+:\/\//;
var db = require('./database');

router.get('/:shortUrl', (req, res) => {
    db.query("SELECT link FROM links WHERE shortened_link = (?) ORDER BY link_id DESC LIMIT 1",
    [req.params.shortUrl], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result && result.length > 0) {
                if (protocol_regex.test(result[0].link)) {
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

module.exports = router;
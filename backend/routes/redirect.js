const router = require("express").Router();
const protocol_regex = /^[a-z0-9]+:\/\//;
var db = require("./database");

router.get("/:shortUrl", (req, res) => {
  db.query(
    `SELECT link, link_id
    FROM links 
    WHERE shortened_link = (?)
        and valid_uses > 0 
        and date_add(last_update_ts, interval 2 minute) >= CURRENT_TIMESTAMP 
    ORDER BY link_id DESC LIMIT 1`,
    // link id,
    [req.params.shortUrl],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // decrement

        if (!result || !result.length) {
          return res.status(404).json("No url found");
        }

        db.query(
          `UPDATE links
            SET 
                valid_uses = valid_uses-1,
                last_update_ts = CURRENT_TIMESTAMP

            WHERE
                link_id=(?);`,
          [result[0].link_id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("succesfully decremented");
            }
          }
        );

        if (protocol_regex.test(result[0].link)) {
          console.log(result[0].link);
          return res.redirect(result[0].link);
        } else {
          console.log("//" + result[0].link);
          return res.redirect("//" + result[0].link);
        }
      }
    }
  );
});

module.exports = router;

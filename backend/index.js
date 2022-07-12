const express = require('express');
const app = express();
const cors = require('cors');
const linksRouter = require('./routes/getlink')
const redirectRouter = require('./routes/redirect');

require('dotenv').config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/getlink", linksRouter);
app.use(redirectRouter);
module.exports = app.listen(port, ()=> {
    console.log("Server running on port", port);
});


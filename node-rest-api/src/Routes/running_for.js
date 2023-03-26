const database = require('../database-connection');
const router = require("express").Router();

router.get("/", async (req, res) => {
    let query = "SELECT * FROM running_for ORDER BY election_ID";

    database.query(query, function (error, data) {
        res.header("Access-Control-Allow-Origin", "*");

        if (error) {
            res.status(500).send("An error occurred executing this query!");
        } else {
            res.status(200).json(data);
        }
    })
});

module.exports = router;

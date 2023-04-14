const database = require('../database-connection');
const router = require("express").Router();

router.get("/", async (req, res) => {
    let query = "SELECT * FROM favorites ORDER BY voter_ID";

    database.query(query, function (error, data) {
        res.header("Access-Control-Allow-Origin", "*");

        if (error) {
            res.status(500).send("An error occurred executing this query!");
        } else {
            res.status(200).json(data);
        }
    })
});

router.get("/get/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).send("You need to provide an ID for the favorites you want to get!");
    } else {
        let query = `SELECT * FROM candidate INNER JOIN favorites ON candidate.ID = favorites.candidate_ID WHERE voter_ID = ${req.params.id}`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).json(data);
            }
        })
    }
});

router.post("/create", async (req, res) => {
    if (req.body.voter_ID !== undefined && req.body.candidate_ID !== undefined) {
        let query = `INSERT INTO favorites VALUES (${req.body.voter_ID}, ${req.body.candidate_ID})`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).json(data);
            }
        })
    } else {
        res.status(500).send("You need to provide a voter ID and candidate ID to create a favorite!");
    }
});

router.post("/delete", async (req, res) => {
    if (req.body.voter_ID !== undefined && req.body.candidate_ID !== undefined) {
        let query = `DELETE FROM favorites WHERE voter_ID = ${req.body.voter_ID} && candidate_ID = ${req.body.candidate_ID}`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).send("Favorite deleted successfully!");
            }
        })
    } else {
        res.status(400).send("You need to provide an a voter ID and candidate ID for the favorite you want to delete!");
    }
});

module.exports = router;

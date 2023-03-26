const database = require('../database-connection');
const router = require("express").Router();

router.get("/", async (req, res) => {
    let query = "SELECT * FROM votes_in ORDER BY election_ID";

    database.query(query, function (error, data) {
        res.header("Access-Control-Allow-Origin", "*");

        if (error) {
            res.status(500).send("An error occurred executing this query!");
        } else {
            res.status(200).json(data);
        }
    })
});

router.post("/create", async (req, res) => {
    if (req.body.voter_ID !== undefined && req.body.election_ID !== undefined && req.body.candidate_ID !== undefined) {
        let query = `INSERT INTO votes_in VALUES (${req.body.voter_ID}, ${req.body.election_ID}, ${req.body.candidate_ID})`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).json(data);
            }
        })
    } else {
        res.status(500).send("You need to provide a voter ID, election ID, and candidate ID to vote in an election!");
    }
});

router.delete("/delete", async (req, res) => {
    if (req.body.voter_ID !== undefined && req.body.election_ID !== undefined && req.body.candidate_ID !== undefined) {
        let query = `DELETE FROM votes_in WHERE voter_ID = ${req.body.voter_ID} && election_ID = ${req.body.election_ID} && candidate_ID = ${req.body.candidate_ID}`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).send("Vote deleted successfully!");
            }
        })
    } else {
        res.status(400).send("You need to provide an a voter ID, election ID, and candidate ID for the vote you want to delete!");
    }
});

module.exports = router;

const database = require('../database-connection');
const router = require("express").Router();

router.get("/", async (req, res) => {
    let query = "SELECT * FROM election ORDER BY ID";

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
        res.status(400).send("You need to provide an ID for the election you want to get!");
    } else {
        let query = `SELECT * FROM election WHERE ID = ${req.params.id}`;

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

router.get("/get-candidates/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).send("You need to provide an ID for the election you want to get!");
    } else {
        let query = `SELECT * FROM candidate INNER JOIN running_for ON candidate.ID = running_for.candidate_ID where running_for.election_ID = ${req.params.id}`;

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

router.get("/get-votes/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).send("You need to provide an ID for the election you want to get!");
    } else {
        let query = `SELECT candidate.ID, candidate.first_name, candidate.last_name, count(ID) AS '# of Votes' FROM candidate INNER JOIN votes_in ON candidate.ID = votes_in.candidate_ID where votes_in.election_ID = ${req.params.id} GROUP BY ID`;

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

router.delete("/delete/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).send("You need to provide an ID for the election you want to delete!");
    } else {
        let query = `DELETE FROM election WHERE ID = ${req.params.id}`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).send("Election deleted successfully!");
            }
        })
    }
});

module.exports = router;

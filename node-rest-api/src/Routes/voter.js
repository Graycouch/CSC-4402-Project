const database = require('../database-connection');
const router = require("express").Router();

router.get("/", async (req, res) => {
    let query = "SELECT * FROM voter ORDER BY ID";

    database.query(query, function (error, data) {
        if (error) {
            res.status(500).send("An error occurred executing this query!");
        } else {
            res.status(200).json(data);
        }
    })
});

router.get("/get/:id", async (req, res) => {
    if (!req.params.id) {
        res.status(400).send("You need to provide an ID for the voter you want to get!");
    } else {
        let query = `SELECT * FROM voter WHERE ID = ${req.params.id}`;

        database.query(query, function (error, data) {
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
        res.status(400).send("You need to provide an ID for the voter you want to delete!");
    } else {
        let query = `DELETE FROM voter WHERE ID = ${req.params.id}`;

        database.query(query, function (error, data) {
            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).send("Voter deleted successfully!");
            }
        })
    }
});

module.exports = router;

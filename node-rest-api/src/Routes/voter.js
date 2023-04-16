const database = require('../database-connection');
const router = require("express").Router();

router.get("/", async (req, res) => {
    let query = "SELECT * FROM voter ORDER BY ID";

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
        res.status(400).send("You need to provide an ID for the voter you want to get!");
    } else {
        let query = `SELECT * FROM voter WHERE ID = ${req.params.id}`;

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
    if (req.body.ID !== undefined && req.body.first_name !== undefined && req.body.last_name !== undefined &&
        req.body.SSN !== undefined && req.body.DOB !== undefined && req.body.district_number !== undefined && req.body.state !== undefined) {
        let query = `INSERT INTO voter VALUES (${req.body.ID}, "${req.body.first_name}", "${req.body.last_name}", "${req.body.SSN}", "${req.body.DOB}", null, null, null, "${req.body.district_number}", "${req.body.state}")`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).json(data);
            }
        })
    } else {
        res.status(500).send("You need to provide data for all the given fields!");
    }
});

router.post("/update", async (req, res) => {
    if (!req.body.ID) {
        res.status(400).send("You need to provide an ID for the voter you want to update!");
    } else {
        let query = `UPDATE voter SET state = "${req.body.state}", district_number = "${req.body.district_number}", email = "${req.body.email}", phone_number = "${req.body.phone_number}", party_ID = "${req.body.party_ID}" WHERE ID = ${req.body.ID}`;
        console.log(query);
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
        res.status(400).send("You need to provide an ID for the voter you want to delete!");
    } else {
        let query = `DELETE FROM voter WHERE ID = ${req.params.id}`;

        database.query(query, function (error, data) {
            res.header("Access-Control-Allow-Origin", "*");

            if (error) {
                res.status(500).send("An error occurred executing this query!");
            } else {
                res.status(200).send("Voter deleted successfully!");
            }
        })
    }
});

module.exports = router;

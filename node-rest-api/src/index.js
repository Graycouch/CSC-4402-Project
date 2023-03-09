const express = require("express");
const app = express();

const ballotRoute = require("./Routes/ballot");
const candidateRoute = require("./Routes/candidate");
const electionRoute = require("./Routes/election");
const opinionRoute = require("./Routes/opinion");
const partyRoute = require("./Routes/party");
const voterRoute = require("./Routes/voter");

app.use("/ballot", ballotRoute);
app.use("/candidate", candidateRoute);
app.use("/election", electionRoute);
app.use("/opinion", opinionRoute);
app.use("/party", partyRoute);
app.use("/voter", voterRoute);

app.listen(8080,
    () => {
        console.log("Backend server is up and running!");
    }
);

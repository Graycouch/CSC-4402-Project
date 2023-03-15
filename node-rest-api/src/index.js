const express = require("express");
const app = express();

const candidateRoute = require("./Routes/candidate");
const electionRoute = require("./Routes/election");
const partyRoute = require("./Routes/party");
const voterRoute = require("./Routes/voter");

app.use("/candidate", candidateRoute);
app.use("/election", electionRoute);
app.use("/party", partyRoute);
app.use("/voter", voterRoute);

app.listen(8080,
    () => {
        console.log("Backend server is up and running!");
    }
);

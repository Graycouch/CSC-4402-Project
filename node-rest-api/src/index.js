const express = require("express");
const app = express();

const voterRoute = require("./Routes/voter");
const candidateRoute = require("./Routes/candidate");
const electionRoute = require("./Routes/election");

app.use("/voter", voterRoute);
app.use("/candidate", candidateRoute);
app.use("/election", electionRoute);

app.listen(8080,
    () => {
        console.log("Backend server is up and running!");
    }
);

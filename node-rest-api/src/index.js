const express = require("express");
const cors = require('cors');
const app = express();

const candidateRoute = require("./Routes/candidate");
const electionRoute = require("./Routes/election");
const favoritesRoute = require("./Routes/favorites");
const partyRoute = require("./Routes/party");
const runningForRoute = require("./Routes/running_for");
const voterRoute = require("./Routes/voter");
const votesInRoute = require("./Routes/votes_in");

// Middleware
app.use(express.json());
app.use(cors());

app.use("/candidate", candidateRoute);
app.use("/election", electionRoute);
app.use("/favorites", favoritesRoute);
app.use("/party", partyRoute);
app.use("/running-for", runningForRoute);
app.use("/voter", voterRoute);
app.use("/votes-in", votesInRoute);

app.listen(8080,
    () => {
        console.log("Backend server is up and running!");
    }
);

const express = require("express");
const mysql = require("mysql");
const app = express();

app.listen(8800,
    () => {
        console.log("Backend Server is up and running!");
    }
);
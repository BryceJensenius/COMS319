// Bryce Jensenius
// brycejen@iastate.edu
// 11/11/24

var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// Mongo DB Setup
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.get("/listMovies", async (req, res) => {
    await client.connect(); // Connecting Node JS to MondoDB
    console.log("Node connected successfully to GET MongoDB");

    const query = {};
    const results = await db
    .collection("movie2")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);

    res.status(200);
    res.send(results);
});

app.get("/:id", async (req, res) => {
    const movieId = req.params.id;
    console.log("Movie to find :", movieId);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {movieId: movieId }; // Query for one with specific id

    const results = await db.collection("movie2")
    .findOne(query);
    console.log("Results :", results);

    if (!results)
        res.send("Not Found").status(404);
    else
        res.send(results).status(200);
});
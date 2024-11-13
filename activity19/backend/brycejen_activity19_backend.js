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

app.get("/robot", async (req, res) => {
    await client.connect(); // Connecting Node JS to MondoDB
    console.log("Node connected successfully to GET MongoDB");

    const query = {};
    const results = await db
    .collection("robot")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);

    res.status(200);
    res.send(results);
});

app.get("/robot/:id", async (req, res) => {
    const id = Number(req.params.id);
    console.log("Robot to find :", id);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {id: id }; // Query for one with specific id

    const results = await db.collection("robot")
    .findOne(query);
    console.log("Results :", results);

    if (!results)
        res.send("Not Found").status(404);
    else
        res.send(results).status(200);
});

app.post("/robot", async (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: 'Bad request: No data provided.' });
    }

    try{
        await client.connect();

        const newDocument = {
            "id": req.body.id,
            "name": req.body.name,
            "price": req.body.price,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl
        };

        const existingDoc = await db
        .collection("robot")
        .findOne({ id: newDocument.id });
        if (existingDoc) { // Already Exists, cannot do
            return res
            .status(409)
            .send({ error: "Conflict: A robot with this ID already exists." });
        }
        console.log(newDocument);

        const results = await db
        .collection("robot")
        .insertOne(newDocument);

        res.status(200);
        res.send(results);
    } catch(error){
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});
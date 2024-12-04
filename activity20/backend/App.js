// Bryce Jensenius
// brycejen@iastate.edu
// 11/15/24

var express = require("express");
var cors = require("cors");
var fs = require("fs");
var multer = require("multer");
var bodyParser = require("body-parser");
var app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// Mongo DB Setup
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);

// MySql
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "brycejen2",
    password: "293dj94jva90ejfJ9jf",
    database: "secoms3190",
});

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Create "uploads" folder if it doesn't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Server
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

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
            .status(404)
            .send({ error: "Conflict: A robot with this ID already exists." });
        }
        console.log(newDocument);

        const results = await db
        .collection("robot")
        .insertOne(newDocument);

        await client.connect();
        const query = {id: req.body.id }; // Query for one with specific id

        const result = await db.collection("robot")
        .findOne(query);
        console.log("Results :", result);

        if (!result)
            res.send("Not Found").status(404);
        else
            res.send(result).status(200);
    } catch(error){
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
});

app.delete("/robot/:id", async (req, res) => {
    try {
        // Read parameter id
        const id = Number(req.params.id);
        console.log("Robot to delete:", id);



        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {id: id }; // Query for one with specific id

        const results = await db.collection("robot")
        .findOne(query);
        console.log("Results :", results);


         // Delete the robot by its ID
        const result = await db.collection("robot").deleteOne({ id: id });

        // Check if a robot was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Robot not found with this ID." });
        }

        if (!results)
            res.send("Not Found").status(404);
        else
            res.send(results).status(200);
    } catch (error) {
        console.error("Error deleting robot:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        // Ensure the client is closed after the operation
        await client.close();
    }
});


app.put("/robot/:id", async (req, res) => {
    const id = Number(req.params.id); // Read parameter id
    console.log("Robot to Update :",id);
    await client.connect(); // Connect Mongodb
    const query = { id: id }; // Update by its id
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
        $set:{
            "name": req.body.name,
            "price": req.body.price,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl
        }
    };
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("robot").updateOne(query, updateData, options);
    console.log(results);
    if(results.matchedCount === 0){
        return res.status(404).send("Message: Robot not found with this ID.");
    }else{
        const robotUpdated = await db.collection("robot").findOne(query);
        res.status(200); // Response to Client
        res.send(robotUpdated);
    }
});

app.get("/contact", (req, res) => {
    try {
        db.query("SELECT * FROM contact", (err, result) => {
            if (err) {
                console.error({error:"Error reading all posts:"+err});
                return res.status(500).send({ error: "Error reading all contacts"+err});
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }
});

app.post("/contact", upload.single("image"), (req, res) => {
    const { contact_name, phone_number, message } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const query = "INSERT INTO contact (contact_name, phone_number, message, image_url) VALUES (?, ?, ?, ?)";
    const checkQuery = "SELECT * FROM contact WHERE contact_name = ?";
    try {
        db.query(checkQuery, [contact_name], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Database error during validation:", checkErr);
                return res.status(500).send({ error: "Error checking contact name: " + checkErr.message });
            }
            if (checkResult.length > 0) {
                // If contact_name exists, send a conflict response
                return res.status(409).send({ error: "Contact name already exists." });
            }
        });

        db.query(query, [contact_name, phone_number, message, imageUrl], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({error:"Error adding contact"+err});
            } else {
                res.status(201).send("Contact added successfully");
            }
        });

    } catch (err) {
        // Handle synchronous errors
        console.error("Error in POST /contact:", err);
        res.status(500).send({ error: "An unexpected error occurred: " + err.message });
    }
});


app.get("/contact/name", (req, res) => {
    const { contact_name } = req.query;
  
    if (!contact_name) {
      return res.status(400).send({ error: "contact_name is required" });
    }
  
    try {
      const query = "SELECT * FROM contact WHERE LOWER(contact_name) LIKE LOWER(?)";
      const searchValue = `%${contact_name}%`; // Add wildcards for partial match
      db.query(query, [searchValue], (err, result) => {
        if (err) {
          console.error("Error fetching contacts:", err);
          return res.status(500).send({ error: "Error fetching contacts" });
        }
        res.status(200).send(result);
      });
    } catch (err) {
      console.error({ error: "An unexpected error occurred in GET by name"+err });
      res.status(500).send({ error: "An unexpected error occurred in GET by name"+err });
    }
  });

  
app.delete("/contact/:id", (req, res) => {
    const id = req.params.id;

    try {
        const query = "DELETE FROM contact WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({err:"Error deleting contact"});
            } else if (result.affectedRows === 0) {
                res.status(404).send({err:"Contact not found"});
            } else {
                res.status(200).send("Contact deleted successfully");
            }
        });
    } catch (err){
        // Handle synchronous errors
        console.error("Error in DELETE /contact:", err);
        res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
    }
});

app.post("/contact/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ error: "Username and password are required." });
    }

    const query = "SELECT role FROM user WHERE user = ? AND password = ?";

    try{
        db.query(query, [username, password], (err, results) => {
            if (err) {
                console.error("Database error during login:", err);
                return res.status(500).send({ error: "An error occurred in Query. Please try again." });
            }
            if (results.length === 0) {
                return res.status(401).send({ error: "Invalid username or password." });
            }
            // If there is not any error, respond with code and role
            const { role } = results[0];
            res.status(200).send({ role });
        });
    }catch(err){
        // Handle synchronous errors
        console.error("Error in GET /contact/login", err);
        res.status(500).send({ error: "An unexpected error occurred in Login: " + err.message });
    }
});

app.post('/contact/messages', (req, res) => {
    try{
        const { contactId, message } = req.body;
        const query = "INSERT INTO message (contact_id, message, message_timestamp) VALUES (?, ?, NOW())";
        db.query(query, [contactId, message], (err, results)=>{
            if (err){
                // In case of an error occurs
                console.log("Error in /contact/messages "+ err);
                res.status(409).send({error:"Error adding Messages "+err});
            } else {
                // If it was successful
                res.status(201).send("Message added successfully");
            }
        });
    } catch (err){
        console.err("Error in /contact/messages "+err);
        res.status(500).send({ error: 'Error sending message'+ err });
    }
});

app.get('/contact/messages/:contactId', (req, res) => {
    try{
        const { contactId } = req.params;
        const query = "SELECT * FROM message WHERE contact_id = ? ORDER BY message_timestamp DESC";

        db.query(query,[contactId],(err,results)=>{
            if (err){
                console.error("Error fetching Messages:", err);
                return res.status(500).send({ error: "Error fetching Messages"+err });
            }
            console.log(results);
            res.status(200).json(results);
        });
    } catch(err){
        res.status(500).send({ error: 'Error fetching messages', err });
    }
});

app.get('/contact/profile_picture/:contact_name', (req, res) => {
    try{
        const contact_name = req.params.contact_name;
        const query = "SELECT image_url FROM contact WHERE contact_name = ?";
        db.query(query, [contact_name], (err, result)=>{
            if (err) {
                console.log({error:"Error in Profile Picture"});
                return res.status(500).send({ error: "Error fetching Profile Picture :"+err });
            } else if (result.length) {
                console.log(result);
                res.json({ picture: result[0].image_url }); // return local url
            } else {
                res.status(404).send({ error: 'Profile picture not found' });
            }
        });
    } catch(err){
        console.error("Error fetching profile picture:", err);
        res.status(500).send({ error: 'Error fetching profile picture :'+ err });
    }
});
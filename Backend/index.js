// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors())
// Connection URL and Database Name from environment variables
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'Passop';

async function main() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const db = client.db(dbName);

        app.get('/', async (req, res) => {
            const collection = db.collection('passwords');
            const findResult = await collection.find({}).toArray();
            res.json(findResult);
        });
        app.post('/', async (req, res) => {
            const password = req.body
            const collection = db.collection('passwords');
            const findResult = await collection.insertOne(password);
            res.send({sucess: true, result: findResult});
        });

        app.delete('/', async (req, res) => {
            const password = req.body
            const collection = db.collection('passwords');
            const findResult = await collection.deleteOne(password);
            res.send({sucess: true, result: findResult});
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
    }
}

main().catch(console.error);

// Access the MONGO_URI environment variable
console.log(process.env.MONGO_URI);

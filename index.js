const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.ENV_USER}:${process.env.ENV_PASS}@cluster0.ffsrenn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("brandServer");
    const samsung = database.collection("samsung");
    const sony = database.collection("sony");
    const apple = database.collection("apple");
    const oneplus = database.collection("oneplus");
    const nokia = database.collection("nokia");
    const nothing = database.collection("nothing");

    // samsung
    app.get("/samsung", async (req, res) => {
      const result = await samsung.find().toArray();
      res.send(result);
    });

    app.post("/samsung", async (req, res) => {
      const newItem = req.body;
      const result = await samsung.insertOne(newItem);
      res.send(result);
    });

    // sony
    app.get("/sony", async (req, res) => {
      const result = await sony.find().toArray();
      res.send(result);
    });

    app.post("/sony", async (req, res) => {
      const newItem = req.body;
      const result = await sony.insertOne(newItem);
      res.send(result);
    });

    // apple
    app.get("/apple", async (req, res) => {
      const result = await apple.find().toArray();
      res.send(result);
    });

    app.post("/apple", async (req, res) => {
      const newItem = req.body;
      const result = await apple.insertOne(newItem);
      res.send(result);
    });

    // onePlus
    app.get("/oneplus", async (req, res) => {
      const result = await oneplus.find().toArray();
      res.send(result);
    });

    app.post("/oneplus", async (req, res) => {
      const newItem = req.body;
      const result = await oneplus.insertOne(newItem);
      res.send(result);
    });

    // nokia
    app.get("/nokia", async (req, res) => {
      const result = await nokia.find().toArray();
      res.send(result);
    });

    app.post("/nokia", async (req, res) => {
      const newItem = req.body;
      const result = await nokia.insertOne(newItem);
      res.send(result);
    });

    // nothing
    app.get("/nothing", async (req, res) => {
      const result = await nothing.find().toArray();
      res.send(result);
    });

    app.post("/nothing", async (req, res) => {
      const newItem = req.body;
      const result = await nothing.insertOne(newItem);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("TECH BRANDS SERVER is running successfully");
});

app.listen(port, () => {
  console.log("successfully running server");
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    const database = client.db("brandsDB");
    const products = database.collection("products");
    const cart = database.collection("cart");

    // products
    app.get("/products", async (req, res) => {
      const result = await products.find().toArray();
      res.send(result);
    });

    app.get("/cart", async (req, res) => {
      const result = await cart.find().toArray();
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newItem = req.body;
      const result = await products.insertOne(newItem);
      res.send(result);
    });

    app.post("/cart", async (req, res) => {
      const addedItem = req.body;
      const result = await cart.insertOne(addedItem);
      res.send(result);
    });

    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cart.deleteOne(query);
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await products.findOne(query);
      res.send(result);
    });

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedProduct = req.body;
      const updateProduct = {
        $set: {
          name: updatedProduct.name,
          brand: updatedProduct.brand,
          type: updatedProduct.type,
          price: updatedProduct.price,
          description: updatedProduct.description,
          rate: updatedProduct.rate,
          img: updatedProduct.img,
        },
      };
      const options = { upsert: true };
      const result = await products.updateOne(query, updateProduct, options);
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

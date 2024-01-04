/* SET UP */
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { generateBooks } = require("./openai");
require("dotenv").config();
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

/* Connect to MongoDB */
const mongodbPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://giangpham25:${mongodbPassword}@cluster0.ow8rheo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error) {
    console.error("Error connecting to MongoDB:", error);
}
}
run().catch(console.dir);

/* APIs */
app.post("/api/submit-book-preferences", async (req, res) => {
  try {
    const { bookMoods, similarBooks } = req.body;
    const recommendedBooks = await generateBooks(bookMoods, similarBooks);
    res.json(recommendedBooks);
  } catch (error) {
    res.json({ error: "Error submitting book preferences from openAI" });
  }
});

app.post("/api/add-to-reading-list", async(req, res) => {
    try {
        const {title, author, description} = req.body;
        const readListDb = client.db("readList")
        const readListCol = readListDb.collection("readListCol")
        await readListCol.insertOne({title, author, description})
        res.json({title, author, description})
    } catch (error) {
        res.json({ error: "Error adding book to read list" });
    }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

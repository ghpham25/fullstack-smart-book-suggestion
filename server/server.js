const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { generateBooks } = require("./openai");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.post("/api/submit-book-preferences", async (req, res) => {
  try {
    const { bookMoods, similarBooks } = req.body;
    const recommendedBooks = await generateBooks(bookMoods, similarBooks);
    res.json(recommendedBooks);
  } catch (error) {
    res.json({ error: "Error submitting book preferences from openAI" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
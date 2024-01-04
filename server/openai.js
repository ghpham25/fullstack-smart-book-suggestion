const axios = require("axios");

async function generateBooks(bookMoods, similarBooks) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const client = axios.create({
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const params = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `What are five books (plus author and short descriptions) that has the moods
            ${bookMoods} and are similar to the books ${similarBooks}, format the answers as 5 
            small paragraphs, each paragraphs has the format: 
            <Number>. <Title> by <Author>: <Description>`,
        },
      ],
      temperature: 1,
    };

    const response = await client.post(
      "https://api.openai.com/v1/chat/completions",
      params
    );
    const recommendedBooks = response.data["choices"][0]["message"]["content"];
    return recommendedBooks;
  } catch (error) {
    console.log("Error generating books:", error);
    throw error;
  }
}

module.exports = {
  generateBooks,
};

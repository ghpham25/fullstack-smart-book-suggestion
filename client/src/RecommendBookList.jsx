import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const extractBookRecommendations = (paragraph) => {
  const pattern = /(\d+)\.\s+"([^"]+)"\s+by\s+([^:]+)[\-:](.+?)(?=\d+\.|$)/gs;
  const matches = Array.from(paragraph.matchAll(pattern));
  console.log(matches);

  const bookRecommendations = matches.map((match) => ({
    order: parseInt(match[1], 10),
    title: match[2].trim(),
    author: match[3].trim(),
    description: match[4].trim(),
  }));

  return bookRecommendations;
};

export default function RecommendBookList() {
  const location = useLocation();
  const recommendedBookListPara = location.state
    ? location.state.responses
    : "";
  const [recommendedBookList, setRecommendedBookList] = useState(
    extractBookRecommendations(recommendedBookListPara)
  );

  const addToReadingList = async (title, author, description) => {
    try {
      console.log(`Adding book ${title} to reading list`);
      const response = await axios.post("http://localhost:3000/api/add-to-reading-list", {
        title: title,
        author: author,
        description: description,
      });
      console.log(response.data)
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div>
      <h2>Book Recommendations</h2>
      <ul>
        {recommendedBookList.map((recommendation) => (
          <div className="book-rec">
            <li key={recommendation.order}>
              <strong>{recommendation.title}</strong> by {recommendation.author}
              : {recommendation.description}
              <div>
                <button
                  onClick={() =>
                    addToReadingList(
                      recommendation.title,
                      recommendation.author,
                      recommendation.description
                    )
                  }
                >
                  {" "}
                  Add to Read list{" "}
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

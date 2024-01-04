import { useLocation } from "react-router-dom";
import { useState } from "react";
const extractBookRecommendations = (paragraph) => {
  const pattern = /(\d+)\.\s+"([^"]+)"\s+by\s+([^:]+)[-:](.+?)(?=\d+\.|$)/gs;
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
  return (
    <div>
      <h2>Book Recommendations</h2>
      <ul>
        {recommendedBookList.map((recommendation) => (
          <li key={recommendation.order}>
            <strong>{recommendation.title}</strong> by {recommendation.author}:{" "}
            {recommendation.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
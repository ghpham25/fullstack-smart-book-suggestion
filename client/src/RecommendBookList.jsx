import { useLocation } from "react-router-dom";

export default function RecommendBookList() {
  const location = useLocation();
  const recommendedBookList = location.state ? location.state.responses : [];
  return (
    <>
      <h2>Generated responses</h2>
      <ul>
        {recommendedBookList.map((list, index) => (
          <li key={index}>{list}</li>
        ))}
      </ul>
    </>
  );
}

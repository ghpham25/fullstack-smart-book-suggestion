import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="website-name">Smart Book Recommendation System</div>
      <div className="pages">
        <div className="home"> Home </div>
        <Link to="/readlist" className="read-list">
          {" "}
          Reading List{" "}
        </Link>
        <div className="book-reviews"> Book Reviews </div>
      </div>
    </>
  );
}

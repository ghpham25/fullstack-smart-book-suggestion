import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [bookMoods, setBookMoods] = useState("");
  const [similarBook1, setSimilar1] = useState("");
  const [similarBook2, setSimilar2] = useState("");
  const [similarBook3, setSimilar3] = useState("");

  const handleSubmit = async (e) => {
    const navigate = useNavigate()
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/submit-book-preferences",
        { bookMoods: bookMoods, similarBooks: similarBook1 + ", " + similarBook2 + ", " + similarBook3 }
      );
      // const recommendedBooks = response.data;
      console.log(response.data)
      // navigate.push("/recommended", {responses: recommendedBooks})
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <form onSubmit = {handleSubmit} id="body">
        <div className="book-mood-question">
          <p> What is your mood for the new book? </p>
          <textarea
            onChange={(e) => setBookMoods(e.target.value)}
            name="book-mood-answer"
            id="book-mood-answer"
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <div className="similar-book-question">
          <p> What are similar books that you like? </p>
          <div className="similar-book-answers">
            <textarea
              onChange={(e) => setSimilar1(e.target.value)}
              name="similar-book-answer"
              id="similar-book-answer-1"
              cols="30"
              rows="10"
            ></textarea>
            <textarea
              onChange={(e) => setSimilar2(e.target.value)}
              name="similar-book-answer"
              id="similar-book-answer-2"
              cols="30"
              rows="10"
            ></textarea>
            <textarea
              onChange={(e) => setSimilar3(e.target.value)}
              name="similar-book-answer"
              id="similar-book-answer-3"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <button className = "button submit" type = "submit"> Generate results </button>
      </form>
    </>
  );
}

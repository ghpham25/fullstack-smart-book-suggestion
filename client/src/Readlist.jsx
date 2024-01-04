import axios from "axios";
import { useEffect, useState } from "react";

export default function Readlist() {
  const [readList, setReadList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/get-reading-list")
      .then((response) => {
        setReadList(response.data.readList);
        console.log(readList)

      })
      .catch((error) => {
        console.error("Error fetching reading list: ", error);
      });
  }, []);

  return (
    <div>
      <h2>Read List</h2>
      <ul>
        {readList.map((book) => (
          <div className="read-list">
            <li key={book.order}>
              <strong>{book.title}</strong> by {book.author}: {book.description}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

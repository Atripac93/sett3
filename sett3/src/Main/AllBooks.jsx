import { useEffect, useState } from "react";
import Carts from "../Cards/Carts";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorBooks, setErrorBooks] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(books);

  const getBooks = async () => {
    setLoading(true);
    try {
      const resp = await fetch("https://epibooks.onrender.com/");
      const data = await resp.json();
      setBooks(data);
      setBooks(data.slice(0, 12));
      setLoading(false);
    } catch (e) {
      setErrorBooks(e.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const changeInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div className="Container">
      <div className="row">
        {errorBooks && <div>qualcosa non va...</div>}
        {loading && !errorBooks && <div>Caricamento in corso...</div>}
        {!loading && !errorBooks && (
          <div>
            <input
              type="text"
              name="changhe"
              placeholder="Cerca un libro..."
              value={searchTerm}
              onChange={changeInput}
            />
            <div className="container d-flex flex-wrap justify-space-beetwen gap-3 mt-3">
              {filterBooks.map((book) => (
                <Carts title={book.title} price={book.price} img={book.img} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;

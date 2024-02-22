import { useDispatch, useSelector } from "react-redux";
import Carts from "../Cards/Carts";
import {
  allBooks,
  getBooks,
  isAllBooksError,
  isAllBooksLoading,
} from "../reducers/booksSlice";
import { useEffect } from "react";

const AllBooks = () => {
  const books = useSelector(allBooks);
  const loading = useSelector(isAllBooksLoading);
  const error = useSelector(isAllBooksError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div className="Container">
      <div className="row">
        {error && <div>Qualcosa non va...</div>}
        {loading && !error && <div>Caricamento in corso...</div>}
        {!loading && !error && (
          <div>
            <div className="container d-flex flex-wrap justify-space-beetwen gap-3 mt-3">
              {books.map((book) => (
                <Carts
                  key={book.id}
                  title={book.title}
                  price={book.price}
                  img={book.img}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;

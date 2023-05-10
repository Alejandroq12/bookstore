import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, deleteBook, createBook } from '../redux/books/booksSlice';
import BookList from '../components/BookList';
import BookForm from '../components/form/BookForm';

function HomePage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => Object.entries(state.books).map(([id, bookData]) => ({
    id,
    item_id: bookData.item_id,
    ...bookData,
  })));

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = async (id, itemId) => {
    if (books.some((book) => book.itemId === itemId && !book.id)) {
      await Promise.all(books.map((book) => {
        if (book.itemId === itemId && !book.id) {
          return dispatch(createBook(book));
        }
        return null;
      }));
    }

    await dispatch(deleteBook(id)).unwrap();
  };

  return (
    <div>
      <BookList
        books={books}
        onDelete={(id, itemId) => handleDelete(id, itemId)}
      />

      <BookForm />
    </div>
  );
}

export default HomePage;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBook, removeBook } from '../redux/books/booksSlice';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

function HomePage() {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleAddBook = (book) => {
    dispatch(addBook(book));
  };

  const handleRemoveBook = (bookId) => {
    dispatch(removeBook(bookId));
  };

  return (
    <div>
      <BookList books={books} onDelete={handleRemoveBook} />
      <BookForm onSubmit={handleAddBook} />
    </div>
  );
}

export default HomePage;

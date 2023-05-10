import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, deleteBook } from '../redux/books/booksSlice';
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

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div>
      <BookList books={books} onDelete={(id) => handleDelete(id)} />

      <BookForm />
    </div>
  );
}

export default HomePage;

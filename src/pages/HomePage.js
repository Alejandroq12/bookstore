import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ParticlesBg from 'particles-bg';
import { fetchBooks, deleteBook } from '../redux/books/booksSlice';
import BookList from '../components/BookList';
import BookForm from '../components/form/BookForm';

function HomePage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div>
      <ParticlesBg type="cobweb" bg />
      <BookList books={sortedBooks} onDelete={(id) => handleDelete(id)} />
      <BookForm />
    </div>
  );
}

export default HomePage;

import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import HomePage from './pages/HomePage';
import Categories from './pages/categories/Categories';

function App() {
  const [books, setBooks] = useState([]);

  const addBook = useCallback((newBook) => {
    const bookWithId = { ...newBook, id: Date.now() };
    setBooks((prevBooks) => [...prevBooks, bookWithId]);
  }, []);

  const deleteBook = useCallback((bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage books={books} onDelete={deleteBook} onSubmit={addBook} />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

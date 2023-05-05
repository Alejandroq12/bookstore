import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Categories from './pages/Categories';

function App() {
  const [books, setBooks] = useState([]);

  function addBook(newBook) {
    const bookWithId = { ...newBook, id: Date.now() };
    setBooks([...books, bookWithId]);
  }

  function deleteBook(bookId) {
    setBooks(books.filter(book => book.id !== bookId));
  }
  

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

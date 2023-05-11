import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Categories.css';
import BookList from '../../components/BookList';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const books = useSelector((state) => state.books);

  const uniqueCategories = Array.from(
    new Set(books.map((book) => book.category)),
  ).sort((a, b) => a.localeCompare(b));

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) => !selectedCategory || book.category === selectedCategory,
  );

  return (
    <div className="container">
      <h2 className="title">Categories</h2>
      <div className="select-wrapper">
        <select
          className="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <BookList books={filteredBooks} />
    </div>
  );
}

export default Categories;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { createBook } from '../../redux/books/booksSlice';
import './BookForm.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && category) {
      const newBook = {
        item_id: nanoid(),
        title,
        author,
        category,
      };
      dispatch(createBook(newBook));
      setTitle('');
      setAuthor('');
      setCategory('');
    }
  };

  return (
    <>
      <div className="form-container">
        <hr className="separator" />
        <h2 className="form-title">ADD NEW BOOK</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-submit">
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}

export default BookForm;

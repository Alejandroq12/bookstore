import React from 'react';
import PropTypes from 'prop-types';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

function HomePage({ books, onDelete, onSubmit }) {
  return (
    <div>
      <BookList books={books} onDelete={onDelete} />
      <BookForm onSubmit={onSubmit} />
    </div>
  );
}

HomePage.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default HomePage;

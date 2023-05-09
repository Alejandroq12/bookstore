import React from 'react';
import PropTypes from 'prop-types';

function IndividualBook({ book, onDelete }) {
  const {
    id, title, author, category,
  } = book;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div>
      <div>
        <p>{category}</p>
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
      <button type="submit" onClick={handleDelete}>Remove Book</button>
    </div>
  );
}

IndividualBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IndividualBook;

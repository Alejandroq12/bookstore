import React from 'react';
import PropTypes from 'prop-types';
import ProgressCircle from '../ProgressCircle';
import './IndividualBook.css';

function IndividualBook({ book, onDelete }) {
  const {
    id, title, author, category,
  } = book;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="individual-book-wrapper">
      <div className="individual-book">
        <div className="book-info">
          <p>{category}</p>
          <h3>{title}</h3>
          <p>{author}</p>
          <div className="buttons">
            <button type="button">Comments</button>
            <button type="submit" onClick={handleDelete}>
              Remove Book
            </button>
            <button type="button">Edit</button>
          </div>
        </div>

        <div className="progress">
          <div className="circle" />
          <ProgressCircle percentage={64} />
          <span>64% Completed</span>
        </div>
        <div className="current-chapter">
          <h4>Current Chapter</h4>
          <p>Chapter 3 of 5</p>
          <button type="button">UPDATE PROGRESS</button>
        </div>
      </div>
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

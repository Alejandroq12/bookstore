import React from 'react';
import PropTypes from 'prop-types';
import ProgressCircle from './ProgressCircle';

function IndividualBook({ book, onDelete }) {
  return (
    <div className="individual-book">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button type="button">Comments</button>
      <button type="button" onClick={() => onDelete(book.id)}>Remove</button>
      <button type="button">Edit</button>
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
  );
}

IndividualBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IndividualBook;

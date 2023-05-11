import React from 'react';
import PropTypes from 'prop-types';
import ProgressCircle from '../progress/ProgressCircle';
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
          <p className="category">{category}</p>
          <h3 className="book-title">{title}</h3>
          <p className="author">{author}</p>
          <div className="buttons">
            <button className="comments" type="button">
              Comments
            </button>
            <button className="remove" type="button" onClick={handleDelete}>
              Remove Book
            </button>
            <button className="edit" type="button">
              Edit
            </button>
          </div>
        </div>

        <div className="progress">
          <div className="circle" />
          <ProgressCircle percentage={64} />
          <div className="percentage-text">
            <div className="percentage-number">
              <span>64%</span>
            </div>
            <span className="completed">Completed</span>
          </div>
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

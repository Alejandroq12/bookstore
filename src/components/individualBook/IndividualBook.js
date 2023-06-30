import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressCircle from '../progress/ProgressCircle';
import CommentsModal from '../comments/CommentsModal';
import './IndividualBook.css';

function IndividualBook({ book, onDelete }) {
  const {
    id, title, author, category,
  } = book;

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedProgress, setUpdatedProgress] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [updatedChapter, setUpdatedChapter] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`bookProgress-${id}`);
    if (savedProgress) {
      setProgressPercentage(parseInt(savedProgress, 10));
    } else {
      setProgressPercentage(64);
    }
  }, [id]);

  useEffect(() => {
    const savedChapter = localStorage.getItem(`bookChapter-${id}`);
    if (savedChapter) {
      setCurrentChapter(parseInt(savedChapter, 10));
    } else {
      setCurrentChapter(book.currentChapter || 0);
    }
  }, [id, book.currentChapter]);

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleUpdateProgress = () => {
    if (updatedProgress) {
      let progress = parseInt(updatedProgress, 10);
      // Ensure progress doesn't exceed 100
      progress = progress > 100 ? 100 : progress;

      localStorage.setItem(`bookProgress-${id}`, progress);
      setProgressPercentage(progress);
    }
    if (updatedChapter) {
      localStorage.setItem(`bookChapter-${id}`, updatedChapter);
      setCurrentChapter(parseInt(updatedChapter, 10));
    }
    setEditMode(false);
  };

  const handleShowCommentsModal = () => {
    setShowCommentsModal(true);
  };

  const handleCloseCommentsModal = () => {
    setShowCommentsModal(false);
  };

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
            <button
              className="comments"
              type="button"
              onClick={handleShowCommentsModal}
            >
              Comments
            </button>
            <button className="remove" type="button" onClick={handleDelete}>
              Remove Book
            </button>
            <button className="edit" type="button" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
        <CommentsModal
          show={showCommentsModal}
          onClose={handleCloseCommentsModal}
          bookId={id}
        />
        <div className="progress">
          <div className="circle" />
          <ProgressCircle percentage={progressPercentage} />
          <div className="percentage-text">
            <div className="percentage-number">
              <span>
                {progressPercentage}
                %
              </span>
            </div>
            <span className="completed">Completed</span>
          </div>
        </div>

        <div className="current-chapter">
          {editMode ? (
            <>
              <input
                type="number"
                value={updatedProgress || ''}
                onChange={(e) => setUpdatedProgress(e.target.value)}
                placeholder="Enter updated progress"
              />
              <input
                type="number"
                value={updatedChapter || ''}
                onChange={(e) => setUpdatedChapter(e.target.value)}
                placeholder="Enter updated page"
              />
              <button type="button" onClick={handleUpdateProgress}>
                <span className="update-progress">Save Progress</span>
              </button>
            </>
          ) : (
            <>
              <h4 className="chapter">CURRENT PAGE</h4>
              <p className="chapter-number">
                Page &nbsp;
                {currentChapter}
              </p>

              <button type="button" onClick={handleEdit}>
                <span className="update-progress">UPDATE PROGRESS</span>
              </button>
            </>
          )}
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
    currentChapter: PropTypes.number.isRequired,
    totalChapters: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IndividualBook;

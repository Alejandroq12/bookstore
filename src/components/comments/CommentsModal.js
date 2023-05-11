import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './CommentsModal.css';

function CommentsModal({ show, bookId, onClose }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(() => {
    const savedComments = JSON.parse(localStorage.getItem(`book-${bookId}-comments`) || '[]');
    setComments(savedComments);
  }, [bookId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      const newComments = [...comments, comment];
      localStorage.setItem(`book-${bookId}-comments`, JSON.stringify(newComments));
      setComment('');
      setComments(newComments);
    }
  };

  return (
    <div className={`modal${show ? ' modal-show' : ''}`}>
      <div className="modal-content">
        <button type="button" className="close" onClick={onClose}>
          &times;
        </button>
        <h2>Add a comment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="comment-input"
            placeholder="Write your comment here..."
            value={comment}
            onChange={handleChange}
          />
          <button type="submit" className="submit-comment">
            Submit
          </button>
        </form>
        <div className="comments-list">
          {comments.map((commentText) => (
            <div key={commentText} className="comment">
              {commentText}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CommentsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  bookId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentsModal;

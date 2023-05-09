import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBook } from '../redux/books/booksSlice';
import ProgressCircle from './ProgressCircle';

function IndividualBook({ book }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeBook(book.item_id));
  };

  return (
    <div className="individual-book">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button type="button">Comments</button>
      <button type="button" onClick={handleDelete}>Remove</button>
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
    item_id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default IndividualBook;

import PropTypes from 'prop-types';
import IndividualBook from './IndividualBook';

function BookList({ books, onDelete }) {
  return (
    <div>
      {books.map((book) => (
        <IndividualBook key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;

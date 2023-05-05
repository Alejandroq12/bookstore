import IndividualBook from './IndividualBook';

function BookList({ books, onDelete }) {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <IndividualBook key={index} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BookList;

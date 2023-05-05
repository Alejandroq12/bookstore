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

export default HomePage;

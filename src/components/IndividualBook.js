import ProgressCircle from './ProgressCircle';


function IndividualBook({ book, onDelete }) {
  return (
    <div className="individual-book">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <button>Comments</button>
      <button onClick={() => onDelete(book.id)}>Remove</button>
      <button>Edit</button>
      <div className="progress">
        <div className="circle" />
        <ProgressCircle percentage={64} />
        <span>64% Completed</span>
      </div>
      <div className="current-chapter">
        <h4>Current Chapter</h4>
        <p>Chapter 3 of 5</p>
        <button>UPDATE PROGRESS</button>
      </div>
    </div>
  );
}

export default IndividualBook;

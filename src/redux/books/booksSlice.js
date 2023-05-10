import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const initialState = [];

const appId = 'dpPGa7YFE6uiFhLP3Oqo';
const apiUrl = `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${appId}/`;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await api.get(`${apiUrl}books`);
  if (response.data) {
    return Object.entries(response.data).map(([id, bookData]) => ({
      id,
      title: bookData[0].title,
      author: bookData[0].author,
      category: bookData[0].category,
    }));
  }
  return [];
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    updateBookId: (state, action) => {
      const { itemId, bookId } = action.payload;
      const bookIndex = state.findIndex((book) => book.item_id === itemId);
      if (bookIndex !== -1) {
        state[bookIndex].id = bookId;
      }
    },
    removeBook: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
    undoRemoveBook: (state, action) => {
      const { index, book } = action.payload;
      state.splice(index, 0, book);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.splice(0, state.length, ...action.payload);
      });
  },
});

const { updateBookId } = booksSlice.actions;

export const createBook = createAsyncThunk(
  'books/createBook',
  async (newBook, { dispatch }) => {
    const itemId = Date.now().toString();
    const response = await api.post(
      `${apiUrl}books`,
      {
        item_id: itemId,
        ...newBook,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const bookId = response.headers['x-id'];

    dispatch(updateBookId({ itemId, bookId }));

    dispatch(fetchBooks());

    return { ...newBook, id: bookId, item_id: itemId };
  },
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (bookId, { getState, dispatch }) => {
    const index = getState().books.findIndex((book) => book.id === bookId);
    if (index === -1) {
      throw new Error('Book not found');
    }

    const removedBook = getState().books[index];
    dispatch(booksSlice.actions.removeBook(index));

    try {
      await api.delete(`${apiUrl}books/${bookId}`);
      return { bookId };
    } catch (error) {
      dispatch(booksSlice.actions.undoRemoveBook({ index, book: removedBook }));
      throw error;
    }
  },
);

booksSlice.extraReducers = (builder) => {
  builder
    .addCase(createBook.fulfilled, (state, action) => {
      state.push(action.payload);
    })
    .addCase(deleteBook.fulfilled, (state, action) => {
      const index = state.findIndex(
        (book) => book.id === action.payload.bookId,
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    });
};

export default booksSlice.reducer;

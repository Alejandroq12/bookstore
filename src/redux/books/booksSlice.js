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
  async (bookId, { dispatch }) => {
    await api.delete(`${apiUrl}books/${bookId}`);

    dispatch(fetchBooks());

    return { bookId };
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

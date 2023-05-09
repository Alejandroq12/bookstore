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

export const createBook = createAsyncThunk('books/createBook', async (newBook) => {
  const itemId = Date.now().toString();
  await api.post(`${apiUrl}books`, {
    item_id: itemId,
    ...newBook,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { ...newBook, id: itemId };
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId) => {
  await api.delete(`${apiUrl}books/${bookId}`);
  return bookId;
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => action.payload)
      .addCase(createBook.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        const index = state.findIndex((book) => book.id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      });
  },
});

export default booksSlice.reducer;

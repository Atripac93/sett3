import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  isLoading: false,
  error: null,
};

export const getBooks = createAsyncThunk("books/GETbooks", async () => {
  try {
    const resp = await axios.get("https://epibooks.onrender.com/");
    return resp.data;
  } catch (e) {
    console.error(e.message);
    throw e; // Rilancia l'errore per gestirlo nel rejected
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const allBooks = (state) => state.booksData.books;
export const isAllBooksLoading = (state) => state.booksData.isLoading;
export const isAllBooksError = (state) => state.booksData.error;

export default booksSlice.reducer;

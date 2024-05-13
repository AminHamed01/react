// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    movies: [],
    message: null,
  },
  reducers: {
    addToWishlist(state, action) {
      const movie = action.payload;
      if (!state.movies.some((m) => m.id === movie.id)) {
        state.movies.push(movie);
        state.message = 'Added to wishlist';
        setTimeout(() => {
          state.message = null;
        }, 2000);
      } else {
        state.message = 'Movie already exists';
      }
    },
    removeFromWishlist(state, action) {
      const movieId = action.payload;
      state.movies = state.movies.filter((m) => m.id !== movieId);
    },
    clearWishlist(state) {
      state.movies = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Safely parse JSON to avoid errors
const safelyParseJSON = (item: string | null) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const initialState = {
  currentUser: safelyParseJSON(localStorage.getItem('currentUser')),

  access: safelyParseJSON(localStorage.getItem('access')),

  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },

    loginSuccess(state, action) {
      state.loading = false;
      const { user, access } = action.payload;
      state.currentUser = user;
      state.access = access;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      localStorage.setItem('access', JSON.stringify(state.access));
    },

    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logoutSuccess(state) {
      state.loading = false;
      state.currentUser = null;
      state.access = null;

      localStorage.removeItem('currentUser');
      localStorage.removeItem('access');
      localStorage.removeItem('accountDetails');
      localStorage.removeItem('transactionDetails');
      state.error = null;
    },

    updateUser(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = null;
    },

    loadingStop(state) {
      state.loading = false;
    },

    removeUser(state) {
      state.loading = false;
      state.currentUser = null;

      localStorage.removeItem('currentUser');
      localStorage.removeItem('access');
      localStorage.removeItem('accountDetails');
      localStorage.removeItem('transactionDetails');
      state.error = null;
    },
  },
});

export const {
  updateUser,
  removeUser,
  logoutSuccess,
  loginStart,
  loginSuccess,
  loginFailure,
  loadingStop,
} = userSlice.actions;

export default userSlice.reducer;

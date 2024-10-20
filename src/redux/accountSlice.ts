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
  accountDetails: safelyParseJSON(localStorage.getItem('accountDetails')),
  singleAccountDetails: safelyParseJSON(
    localStorage.getItem('singleAccountDetails')
  ),
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    getAccountsSuccess(state, action) {
      state.loading = false;
      const accountDetails = action.payload;

      state.accountDetails = accountDetails;

      localStorage.setItem(
        'accountDetails',
        JSON.stringify(state.accountDetails)
      );
    },
    getSingleAccountSuccess(state, action) {
      state.loading = false;
      const singleAccountDetails = action.payload;
      state.singleAccountDetails = singleAccountDetails;

      localStorage.setItem(
        'singleAccountDetails',
        JSON.stringify(state.singleAccountDetails)
      );
    },

    getAccountsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getAccountsStart(state) {
      state.loading = true;
    },

    clearAccounts(state) {
      state.accountDetails = null;
      state.singleAccountDetails = null;
    },
  },
});

export const {
  getSingleAccountSuccess,
  getAccountsStart,
  getAccountsSuccess,
  clearAccounts,
  getAccountsFailure,
} = accountSlice.actions;

export default accountSlice.reducer;

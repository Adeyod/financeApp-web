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

  accountDetails: safelyParseJSON(localStorage.getItem('accountDetails')),
  transactionDetails: safelyParseJSON(
    localStorage.getItem('transactionDetails')
  ),

  totalTransactionsCount: safelyParseJSON(
    localStorage.getItem('totalTransactionsCount')
  ),

  loading: false,
  error: false,
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
      state.transactionDetails = null;
      state.accountDetails = null;

      localStorage.removeItem('currentUser');
      localStorage.removeItem('access');
      localStorage.removeItem('accountDetails');
      localStorage.removeItem('transactionDetails');
      state.error = false;
    },

    updateUser(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = false;
    },

    loadingStop(state) {
      state.loading = false;
    },

    removeUser(state) {
      state.loading = false;
      state.currentUser = null;
      state.transactionDetails = null;
      state.accountDetails = null;

      localStorage.removeItem('currentUser');
      localStorage.removeItem('access');
      localStorage.removeItem('accountDetails');
      localStorage.removeItem('transactionDetails');
      state.error = false;
    },
    getTransactionsStart(state) {
      state.loading = true;
    },
    getAccountsStart(state) {
      state.loading = true;
    },

    getAccountsSuccess(state, action) {
      state.loading = false;
      const accountDetails = action.payload;

      state.accountDetails = accountDetails;

      localStorage.setItem(
        'accountDetails',
        JSON.stringify(state.accountDetails)
      );
    },

    getTransactionsSuccess(state, action) {
      state.loading = false;
      const transactionDetails = action.payload;
      console.log(transactionDetails.totalCount);

      // const { totalCount, transactions } = transactionDetails;

      // const result = {
      //   totalCount,
      //   transactions,
      // };

      state.transactionDetails = transactionDetails.transactions;
      state.totalTransactionsCount = transactionDetails.totalCount;

      localStorage.setItem(
        'transactionDetails',
        JSON.stringify(state.transactionDetails)
      );

      localStorage.setItem(
        'totalTransctionsCount',
        JSON.stringify(state.totalTransactionsCount)
      );
    },

    getAccountsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getTransactionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTransactionsStart,
  getAccountsStart,
  getAccountsSuccess,
  getTransactionsSuccess,
  getAccountsFailure,
  getTransactionsFailure,
  updateUser,
  removeUser,
  logoutSuccess,
  loginStart,
  loginSuccess,
  loginFailure,
  loadingStop,
} = userSlice.actions;

export default userSlice.reducer;

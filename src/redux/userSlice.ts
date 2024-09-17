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

  loading: false,
  error: false,
};
// const initialState = {
//   currentUser: localStorage.getItem('currentUser')
//     ? JSON.parse(localStorage.getItem('currentUser') as string)
//     : null,

//   access: localStorage.getItem('access')
//     ? JSON.parse(localStorage.getItem('access') as string)
//     : null,

//   accountDetails: localStorage.getItem('accountDetails')
//     ? JSON.parse(localStorage.getItem('accountDetails') as string)
//     : null,
//   transactionDetails: localStorage.getItem('transactionDetails')
//     ? JSON.parse(localStorage.getItem('transactionDetails') as string)
//     : null,

//   loading: false,
//   error: false,
// };

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
    getAccountsAndTransactionsStart(state) {
      state.loading = true;
    },
    getAccountsAndTransactionsSuccess(state, action) {
      state.loading = false;
      const { accountDetails, transactionDetails } = action.payload;
      state.accountDetails = accountDetails;
      state.transactionDetails = transactionDetails;

      localStorage.setItem(
        'accountDetails',
        JSON.stringify(state.accountDetails)
      );
      localStorage.setItem(
        'transactionDetails',
        JSON.stringify(state.transactionDetails)
      );
    },
    getAccountsAndTransactionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAccountsAndTransactionsStart,
  getAccountsAndTransactionsSuccess,
  getAccountsAndTransactionsFailure,
  updateUser,
  removeUser,
  logoutSuccess,
  loginStart,
  loginSuccess,
  loginFailure,
  loadingStop,
} = userSlice.actions;

export default userSlice.reducer;

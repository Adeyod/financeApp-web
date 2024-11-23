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
  allCustomers: safelyParseJSON(localStorage.getItem('allCustomers')),
  allTransactions: safelyParseJSON(localStorage.getItem('allTransactions')),
  allAccounts: safelyParseJSON(localStorage.getItem('allAccounts')),
  allTransactionsTotalCount: safelyParseJSON(
    localStorage.getItem('allTransactionsTotalCount')
  ),
  allAccountsTotalCount: safelyParseJSON(
    localStorage.getItem('allAccountsTotalCount')
  ),
  allCustomersTotalCount: safelyParseJSON(
    localStorage.getItem('allCustomersTotalCount')
  ),

  singleCustomerDetails: safelyParseJSON(
    localStorage.getItem('singleCustomerDetails')
  ),
  singleTransactionDetails: safelyParseJSON(
    localStorage.getItem('singleTransactionDetails')
  ),
  singleAccountDetails: safelyParseJSON(
    localStorage.getItem('singleAccountDetails')
  ),

  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getAllAccountsSuccess(state, action) {
      const { accounts, totalCount } = action.payload;
      state.allAccounts = accounts;
      state.allAccountsTotalCount = totalCount;

      localStorage.setItem('allAccounts', JSON.stringify(state.allAccounts));
      localStorage.setItem(
        'allAccountsTotalCount',
        JSON.stringify(state.allAccountsTotalCount)
      );
    },

    getAllCustomersSuccess(state, action) {
      const { customers, totalCount } = action.payload;
      state.allCustomers = customers;
      state.allCustomersTotalCount = totalCount;

      localStorage.setItem('allCustomers', JSON.stringify(state.allCustomers));
      localStorage.setItem(
        'allCustomersTotalCount',
        JSON.stringify(state.allCustomersTotalCount)
      );
    },

    getAllTransactionsSuccess(state, action) {
      const { transactions, totalCount } = action.payload;
      state.allTransactions = transactions;
      state.allTransactionsTotalCount = totalCount;

      localStorage.setItem(
        'allTransactions',
        JSON.stringify(state.allTransactions)
      );
      localStorage.setItem(
        'allTransactionsTotalCount',
        JSON.stringify(state.allTransactionsTotalCount)
      );
    },

    getSingleAccountOfAUserSuccess(state, action) {
      state.singleAccountDetails = action.payload;
    },

    getSingleTransactionOfAUserSuccess(state, action) {
      state.singleTransactionDetails = action.payload;
      console.log(
        'state.singleTransactionDetails',
        state.singleTransactionDetails
      );
    },

    getSingleCustomerSuccess(state, action) {
      state.singleCustomerDetails = action.payload;
    },

    // updateUser(state, action) {
    //   state.loading = false;
    //   state.currentUser = action.payload;
    //   localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    //   state.error = null;
    // },

    // loadingStop(state) {
    //   state.loading = false;
    // },

    clearAdmin(state) {
      state.allCustomers = null;
      state.allTransactions = null;
      state.allAccounts = null;
      state.allTransactionsTotalCount = null;
      state.allAccountsTotalCount = null;
      state.allCustomersTotalCount = null;
      state.singleCustomerDetails = null;
      state.singleTransactionDetails = null;
      state.singleAccountDetails = null;
      state.loading = false;

      localStorage.removeItem('allCustomers');
      localStorage.removeItem('allTransactions');
      localStorage.removeItem('allAccounts');
      localStorage.removeItem('allTransactionsTotalCount');
      localStorage.removeItem('allAccountsTotalCount');
      localStorage.removeItem('allCustomersTotalCount');
      localStorage.removeItem('singleCustomerDetails');
      localStorage.removeItem('singleTransactionDetails');
      localStorage.removeItem('singleAccountDetails');
      state.error = null;
    },
  },
});

export const {
  clearAdmin,
  getSingleTransactionOfAUserSuccess,
  getSingleCustomerSuccess,
  getAllTransactionsSuccess,
  getAllAccountsSuccess,
  getAllCustomersSuccess,
  getSingleAccountOfAUserSuccess,
  // updateUser,
  // removeUser,
  // loadingStop,
} = adminSlice.actions;

export default adminSlice.reducer;

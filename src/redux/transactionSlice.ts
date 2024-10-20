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
  transactionDetails: safelyParseJSON(
    localStorage.getItem('transactionDetails')
  ),

  singleTransactionDetails: safelyParseJSON(
    localStorage.getItem('singleTransactionDetails')
  ),

  totalTransactionsCount: safelyParseJSON(
    localStorage.getItem('totalTransactionsCount')
  ),

  singleAccountTransactionDetails: safelyParseJSON(
    localStorage.getItem('singleAccountTransactionDetails')
  ),
  singleAccountCompletedTransactionsCount: safelyParseJSON(
    localStorage.getItem('singleAccountCompletedTransactionsCount')
  ),
  singleAccountTotalTransactionsCount: safelyParseJSON(
    localStorage.getItem('singleAccountTotalTransactionsCount')
  ),

  loading: false,
  error: false,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactionsStart(state) {
      state.loading = true;
    },

    getSingleAccountTransactionsStart(state) {
      state.loading = true;
    },

    getSingleTransactionSuccess(state, action) {
      state.loading = false;

      state.singleTransactionDetails = action.payload;

      localStorage.setItem(
        'singleTransactionDetails',
        JSON.stringify(state.singleTransactionDetails)
      );
    },

    getSingleAccountTransactionsSuccess(state, action) {
      state.loading = false;

      const { transactions, completed_transactions, totalCount } =
        action.payload;
      state.singleAccountTransactionDetails = transactions;

      state.singleAccountCompletedTransactionsCount = completed_transactions;
      state.singleAccountTotalTransactionsCount = totalCount;

      localStorage.setItem(
        'singleAccountTotalTransactions',
        JSON.stringify(state.singleAccountTotalTransactionsCount)
      );
      localStorage.setItem(
        'singleAccountCompletedTransactionsCount',
        JSON.stringify(state.singleAccountCompletedTransactionsCount)
      );

      localStorage.setItem(
        'singleAccountTransactionDetails',
        JSON.stringify(state.singleAccountTransactionDetails)
      );
    },

    getSingleAccountTransactionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getTransactionsSuccess(state, action) {
      state.loading = false;
      const transactionDetails = action.payload;
      console.log(transactionDetails.totalCount);

      state.transactionDetails = transactionDetails.transactions;
      state.totalTransactionsCount = transactionDetails.totalCount;

      localStorage.setItem(
        'transactionDetails',
        JSON.stringify(state.transactionDetails)
      );

      localStorage.setItem(
        'totalTransactionsCount',
        JSON.stringify(state.totalTransactionsCount)
      );
    },

    getTransactionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getSingleTransactionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearTransactions(state) {
      state.transactionDetails = null;
      state.totalTransactionsCount = null;
      state.singleAccountTransactionDetails = null;
      state.singleTransactionDetails = null;
      state.singleAccountCompletedTransactionsCount = null;
      state.singleAccountTotalTransactionsCount = null;

      localStorage.removeItem('transactionDetails');
      localStorage.removeItem('totalTransactionsCount');

      localStorage.removeItem('singleAccountTotalTransactions');
      localStorage.removeItem('singleAccountCompletedTransactionsCount');

      localStorage.removeItem('singleAccountTransactionDetails');
      localStorage.removeItem('singleTransactionDetails');
    },
  },
});

export const {
  getSingleTransactionSuccess,
  getSingleTransactionFailure,
  clearTransactions,
  getSingleAccountTransactionsStart,
  getSingleAccountTransactionsSuccess,
  getSingleAccountTransactionsFailure,
  getTransactionsStart,
  getTransactionsSuccess,
  getTransactionsFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;

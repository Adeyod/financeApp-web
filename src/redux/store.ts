import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import transactionReducer from './transactionSlice';
import accountReducer from './accountSlice';
import notificationReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    accounts: accountReducer,
    notifications: notificationReducer,
  },
});

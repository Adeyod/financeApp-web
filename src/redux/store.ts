import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import transactionReducer from './transactionSlice';
import accountReducer from './accountSlice';
import notificationReducer from './notificationSlice';
import adminReducer from './adminSlice';
import superAdminReducer from './superAdminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    accounts: accountReducer,
    notifications: notificationReducer,
    admin: adminReducer,
    super_admin: superAdminReducer,
  },
});

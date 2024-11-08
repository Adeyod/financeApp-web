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
  userNotifications: safelyParseJSON(localStorage.getItem('userNotifications')),
  singleUserNotification: safelyParseJSON(
    localStorage.getItem('singleUserNotification')
  ),
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotificationsSuccess(state, action) {
      state.loading = false;
      const userNotifications = action.payload;

      state.userNotifications = userNotifications;
      console.log(userNotifications);

      localStorage.setItem(
        'userNotifications',
        JSON.stringify(state.userNotifications)
      );
    },

    getSingleNotificationSuccess(state, action) {
      state.loading = false;
      const singleUserNotification = action.payload;
      state.singleUserNotification = singleUserNotification;

      localStorage.setItem(
        'singleUserNotification',
        JSON.stringify(state.singleUserNotification)
      );
    },

    getNotificationsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getNotificationsStart(state) {
      state.loading = true;
    },

    clearNotifications(state) {
      state.userNotifications = null;
      state.singleUserNotification = null;
    },
  },
});

export const {
  clearNotifications,
  getNotificationsStart,
  getNotificationsSuccess,
  getSingleNotificationSuccess,
  getNotificationsFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;

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
  totalIsViewed: safelyParseJSON(localStorage.getItem('totalIsViewed')),
  totalNotificationsCount: safelyParseJSON(
    localStorage.getItem('totalNotificationsCount')
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
      const { totalCount, totalIsViewed, notifications } = action.payload;
      const userNotifications = notifications;

      state.userNotifications = userNotifications;
      state.totalNotificationsCount = totalCount;
      state.totalIsViewed = totalIsViewed;

      localStorage.setItem(
        'userNotifications',
        JSON.stringify(state.userNotifications)
      );
      localStorage.setItem(
        'totalIsViewed',
        JSON.stringify(state.totalIsViewed)
      );
      localStorage.setItem(
        'totalNotificationsCount',
        JSON.stringify(state.totalNotificationsCount)
      );
    },

    getSingleNotificationSuccess(state, action) {
      state.loading = false;
      state.singleUserNotification = action.payload;

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
      state.totalIsViewed = null;
      state.totalNotificationsCount = null;

      localStorage.removeItem('userNotifications');
      localStorage.removeItem('singleUserNotification');
      localStorage.removeItem('totalIsViewed');
      localStorage.removeItem('totalNotificationsCount');
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

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
  allAdmins: safelyParseJSON(localStorage.getItem('allAdmins')),
  allAdminsTotalCount: safelyParseJSON(
    localStorage.getItem('allAdminsTotalCount')
  ),
  singleAdminDetails: safelyParseJSON(
    localStorage.getItem('singleAdminDetails')
  ),
  access: safelyParseJSON(localStorage.getItem('access')),
  loading: false,
  error: null,
};

const superAdminSlice = createSlice({
  name: 'super_admin',
  initialState,
  reducers: {
    getAllAdminsSuccess(state, action) {
      const { admins, totalCount } = action.payload;
      state.allAdmins = admins;
      state.allAdminsTotalCount = totalCount;

      localStorage.setItem('allAdmins', JSON.stringify(state.allAdmins));
      localStorage.setItem(
        'allAdminsTotalCount',
        JSON.stringify(state.allAdminsTotalCount)
      );
    },

    getSingleAdminSuccess(state, action) {
      state.singleAdminDetails = action.payload;
    },

    clearSuperAdmin(state) {
      state.loading = false;

      state.allAdmins = null;
      state.allAdminsTotalCount = null;
      state.singleAdminDetails = null;

      localStorage.removeItem('allAdmins');
      localStorage.removeItem('allAdminsTotalCount');
      localStorage.removeItem('singleAdminDetails');
      state.error = null;
    },
  },
});

export const {
  clearSuperAdmin,
  getSingleAdminSuccess,
  getAllAdminsSuccess,
  // updateUser,
  // removeUser,
  // loadingStop,
} = superAdminSlice.actions;

export default superAdminSlice.reducer;

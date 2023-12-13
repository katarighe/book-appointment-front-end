import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUser: {},
  isLoggedIn: false,
};

export const userAuthSlice = createSlice({
  name: 'userDatas',
  initialState: initialState,

  reducers: {
    userAuthData: (state, action) => {
      state.authUser = action.payload;
      state.isLoggedIn = true;
    },

    userLogOut: (state) => {
      state.authUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { userAuthData, userLogOut } = userAuthSlice.actions;

export const selectUserData = (state) => state.userAuthSlice;

export default userAuthSlice.reducer;

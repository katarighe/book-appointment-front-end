import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    count: 0,
  },

  reducers: {
    toggleShow: (state, action) => {
      // Toggle icon state based on the IDs
      const id = action.payload;
      return {
        ...state,
        [id]: !state[id],
      };
    },

    increment: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { toggleShow, increment } = globalSlice.actions;

export const selectGlobal = (state) => state.globalSlice;
export default globalSlice.reducer;

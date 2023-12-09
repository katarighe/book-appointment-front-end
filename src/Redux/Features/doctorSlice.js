import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api/apis';

const initialState = {
  allDoctors: [],
  isLoading: false,
  isError: '',
};

export const addDoctors = createAsyncThunk(
  'doctors/addMeal',
  async (mealData, thunkAPI) => {
    try {
      const response = await API.addDoctors(mealData);
      return response.data;
    } catch (error) {
      console.log(error);
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const doctorSlice = createSlice({
  name: 'doctors',
  initialState: initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = '';
        state.allDoctors = action.payload;
      })
      .addCase(addDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { userAuthData, userLogOut } = doctorSlice.actions;

export const selectUserData = (state) => state.doctorSlice;

export default doctorSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api/apis';

const initialState = {
  allDoctors: [],
  isLoading: false,
  isError: '',
};

export const addDoctors = createAsyncThunk(
  'doctors/addDoctors',
  async (userData, thunkAPI) => {
    try {
      const response = await API.addDoctors(userData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteDoctors = createAsyncThunk(
  'doctors/deleteDoctors',
  async (id, thunkAPI) => {
    try {
      const response = await API.deleteDoctors(id);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getDoctors = createAsyncThunk(
  'doctors/getDoctors',
  async (_, thunkAPI) => {
    try {
      const response = await API.getDoctors();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const doctorSlice = createSlice({
  name: 'doctors',
  initialState,

  reducers: {
    removeDoctor: (state, action) => {
      const docId = action.payload;
      state.allDoctors = state.allDoctors.filter((doc) => doc.id !== docId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = '';
        state.allDoctors.push(action.payload);
      })
      .addCase(addDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(getDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = '';
        state.allDoctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload
          ? action.payload.error
          : 'An error occurred';
      })
      .addCase(deleteDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDoctors.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = '';
      })
      .addCase(deleteDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload
          ? action.payload.error
          : 'An error occurred';
      });
  },
});

export const { removeDoctor } = doctorSlice.actions;
export const selectDoctor = (state) => state.doctorSlice;
export default doctorSlice.reducer;

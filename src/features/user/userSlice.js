import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  donation: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const user = action.payload;
      state.user = user;
    },
    getDonationsOfUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const donations = action.payload.donations;
      state.donation = donations;
    },
  },
});

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.get("/users/me");
    console.log('res', response);
    dispatch(slice.actions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getDonationsOfUser = () => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.get("/users/donations");
    dispatch(slice.actions.getDonationsOfUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;

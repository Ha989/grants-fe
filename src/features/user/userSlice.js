import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  error: null,
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
       getDonationsOfUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const donations = action.payload.donations;
      state.donation = donations;
    },
  }
});

export const getDonationsOfUser = ({ limit = 10, page, status }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { page, limit };
    if (status) {
      params.status = status;
    }
    const response = await apiService.get("/users/donations", { params });
    dispatch(slice.actions.getDonationsOfUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};


export default slice.reducer;

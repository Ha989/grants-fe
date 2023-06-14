import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { notifications } = action.payload;
      state.notifications = notifications;
      console.log("no", notifications);
    },
  },
});

export const getAllNotificationOfUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/notifications`);
    console.log("res", response.data);
    dispatch(slice.actions.getNotificationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;

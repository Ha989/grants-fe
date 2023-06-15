import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
  count: null
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
    },
    countNewNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count } = action.payload;
      state.count = count;
      console.log("countSlice", count)
    }
  },
});

export const getAllNotificationOfUser = ({ limit = 10, skip }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { limit, skip }
    console.log("params", params)
     
    const response = await apiService.get(`/notifications`, params);
    console.log("res", response.data);
    dispatch(slice.actions.getNotificationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateNotification = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put("/notifications");
    console.log(response.data)
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}

export const countNewNotifications = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get('/notifications/new');
    console.log("count", response.data);
    dispatch(slice.actions.countNewNotificationSuccess(response.data))
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}

export default slice.reducer;

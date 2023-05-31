import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  donation: [],
  bookmarked: [],
  updatedProfile: null
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
      const { donations, totalPage } = action.payload;
      state.donation = donations;
      state.totalPage = totalPage;
    },
    getBookmarkedOfUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const bookmarked = action.payload.bookmarkedProjects;
      state.bookmarked = bookmarked;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    }
  },
});

export const getDonationsOfUser =
  ({ limit = 10, page, status }) =>
  async (dispatch) => {
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

export const getBookmarkedOfUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/bookmarks");
    dispatch(slice.actions.getBookmarkedOfUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateUserProfile = ({
  userId, name, avatarUrl, bio
}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const data = {
      name, avatarUrl, bio
    };
    if(avatarUrl instanceof File) {
      const imageUrl = await cloudinaryUpload(avatarUrl);
      data.avatarUrl = imageUrl;
      console.log("image", imageUrl)
    }
    const response = await apiService.put(`/users/settings/${userId}`, data);
    console.log("resp", response)
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
    toast.success("Update Profile Successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}

export default slice.reducer;

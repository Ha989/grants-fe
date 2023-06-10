import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { DONATIONS_LIMIT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  donation: [],
  bookmarked: [],
  updatedProfile: null,
  bookmark: [],
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
      const updatedUser = action.payload.user;
      state.updatedProfile = updatedUser;
    },
    bookmarkProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const bookmark  = action.payload.user;
      state.bookmark = bookmark.bookmarked;
      console.log("bookmark", bookmark.bookmarked)
    
    }
  },
});

export const getDonationsOfUser =
  ({ limit = DONATIONS_LIMIT_PER_PAGE, page, status }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      console.log("params", params)
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
      console.log("image", imageUrl)
      data.avatarUrl = imageUrl;
    }
    const response = await apiService.put(`/users/settings/${userId}`, data);
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
    toast.success("Update Profile Successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const bookmarkProject = ({ projectId, userId }) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await apiService.put(`/projects/${projectId}/bookmark/${userId}`);
    console.log("res", response.data)
    dispatch(slice.actions.bookmarkProjectSuccess(response.data));
    toast.success(response.message)
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message)
  }
}

export default slice.reducer;

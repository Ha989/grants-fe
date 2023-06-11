import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getSingleProject } from "../project/projectSlice";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
        state.isLoading = false;
      state.error = null;
      const comment = action.payload;
      state.newComment = comment;
      console.log("new comment", comment)
    }
  },
});

export const createComment =
  ({ projectId, content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/comments", {
        projectId,
        content,
        image: imageUrl,
      });
      console.log("res", response.data)
      dispatch(slice.actions.createCommentSuccess(response.data));
      toast.success(response.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;

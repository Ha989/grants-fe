import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getSingleProject } from "../project/projectSlice";

const initialState = {
  isLoading: false,
  error: null,
  newComment: {},
  updatedComment: {},
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
    },
    updateCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedComment = action.payload;
      state.updatedComment = updatedComment;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { comment } = action.payload;
      delete state.comment;
    },
  },
});

export const createComment =
  ({ projectId, parentId, content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/comments", {
        projectId,
        parentId,
        content,
        image: imageUrl,
      });
      console.log("res", response.data);
      dispatch(slice.actions.createCommentSuccess(response.data));
      toast.success(response.message);
      dispatch(getSingleProject(projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateComment =
  ({ id, projectId, content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { content, image };
      const response = await apiService.put(`/comments/${id}`, data);
      dispatch(slice.actions.updateCommentSuccess(response.data));
      toast.success(response.message);
      dispatch(getSingleProject(projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteComment =
  ({ id, projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/comments/${id}`);
      console.log("res", response);
      dispatch(slice.actions.deleteCommentSuccess(response.data));
      toast.success(response.data);
      dispatch(getSingleProject(projectId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;

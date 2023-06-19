import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { PROJECTS_LIMIT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  project: [],
  donation: null,
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { projects, totalPage } = action.payload;
      state.project = projects;
      state.totalPage = totalPage;
    },
    getSingleProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const currentProject = action.payload;
      state.currentProject = currentProject;
    },
    createDonationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { donation } = action.payload;
      state.donation = donation;
    },
  },
});

export const getProjects =
  ({ page, limit = PROJECTS_LIMIT_PER_PAGE, search, sortBy }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (search) {
        params.search = search;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      }
      const response = await apiService.get(`/projects`, {
        params,
      });
      dispatch(slice.actions.getProjectSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleProject = (id) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());

    const response = await apiService.get(`projects/${id}`);
    dispatch(slice.actions.getSingleProjectSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createDonation =
  ({ projectId, userId, amount }) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await apiService.post(
        `/projects/${projectId}/donation/${userId}`,
        { amount }
      );
      dispatch(slice.actions.createDonationSuccess(response.data));
      toast.success(
        "Sent donation successfully! Please wait for project owner to confirm!"
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;

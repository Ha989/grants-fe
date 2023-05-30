import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  project: [],
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
  },
});

export const getProjects =
  ({ page, limit = 10, search, sortBy }) =>
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



// export const createDonation = ({ projectId, userId, amount }) => async (dispatch) => {
//   try {
//     dispatch(slice.actions.startLoading());

//     const params =
//   } catch (error) {
//     dispatch(slice.actions.hasError(error.message));
//     toast.error(error.message);
//   }
// }

export default slice.reducer;

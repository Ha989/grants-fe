import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    error: null
}

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

        getProjectSuccess( state, action ) {
            state.isLoading = false;
            state.error = null;
            const { projects } = action.payload;
            state.project = projects;
        }
    }
});


export const getProjects = ({ page, limit = 10, search, sortBy }) => 
  async(dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const params = { page, limit };
        if(search) {

            params.search = search
        };
        if(sortBy) {
            params.sortBy = sortBy
        }
        console.log("params", params)
        const response = await apiService.get(`/projects`, {
            params,
        });

        dispatch(slice.actions.getProjectSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
  };

export default slice.reducer;
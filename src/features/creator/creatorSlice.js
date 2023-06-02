import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";
// import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    startLoading(state) {
        state.isLoading = true;
      },
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },

      createProjectSuccess(state, action) {
        state.isLoading = false;
      state.error = null;
      const { project } = action.payload;
      state.project = project;
      console.log("project", project);
      }
  },
});

export const createProject =
  ({
    creatorId,
    name,
    title,
    description,
    website,
    team,
    logo,
    banner,
    video,
    bankDetail,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const bannerUrl = await cloudinaryUpload(banner);
        console.log("banner", bannerUrl);
        // const logoUrl = await cloudinaryUpload(logo);
        // console.log("logo", logoUrl)
      const body = {
        name,
        title,
        description,
        website,
        team,
        logo,
        banner: bannerUrl,
        video,
        bankDetail,
      };
      const response = await apiService.post(`/creators/${creatorId}/create`, body );
      console.log("res", response.data);
      dispatch(slice.actions.createProjectSuccess(response.data));
      toast.success(response.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

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
    },
    getDonationsByCreatorsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { donations } = action.payload;
      state.donations = donations;
      console.log("donations", donations);
    },
    getSingleDonationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { donation } = action.payload;
      state.donation = donation;
    },
    confirmDonationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { confirmDonation } = action.payload;
      state.donation = confirmDonation;
      console.log("do", confirmDonation);
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

      const logoUrl = await cloudinaryUpload(logo);

      const body = {
        name,
        title,
        logo: logoUrl,
        banner: bannerUrl,
        website,
        description,
        team,
        video,
        bankDetail,
      };

      const response = await apiService.post(
        `/creators/${creatorId}/create`,
        body
      );
      console.log("res", response.data);
      dispatch(slice.actions.createProjectSuccess(response.data));
      toast.success(response.message);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getDonationsByCreator = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/creators/donations`);
    dispatch(slice.actions.getDonationsByCreatorsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};


export const getSingleDonation = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/creators/donations/${id}`);
    console.log("res", response);
    dispatch(slice.actions.getSingleDonationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};


export const confirmDonation = (donationId ) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/creators/donations/${donationId}`);
    console.log("res", response);
    dispatch(slice.actions.confirmDonationSuccess(response.data));
    toast.success(response.message);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}
export default slice.reducer;

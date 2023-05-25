import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectSlice";
import creatorReducer from "../features/creator/creatorSlice";
import userReducer from "../features/user/userSlice";
import donationReducer from "../features/donation/donationSlice";
import commentReducer from "../features/comment/commentSlice";


const rootReducer = {
    project: projectReducer,
    user: userReducer,
    creator: creatorReducer,
    donation: donationReducer,
    comment: commentReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;
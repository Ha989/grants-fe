import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectSlice";
import creatorReducer from "../features/creator/creatorSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";
import notificationReducer from "../features/notification/notificationSlice";


const rootReducer = {
    project: projectReducer,
    user: userReducer,
    creator: creatorReducer,
    comment: commentReducer,
    notification: notificationReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slice/loaderSlice";
import blogSlice from "./Slice/blogSlice";
import userSlice from "./Slice/userSlice";

export default configureStore({
  reducer: {
    loader: loaderSlice,
    blog: blogSlice,
    user: userSlice,
  },
});

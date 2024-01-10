import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    viewUser: (state, action) => {
      return { ...state, data: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { viewUser } = userSlice.actions;

export default userSlice.reducer;

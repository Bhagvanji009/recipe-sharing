import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: localStorage.getItem("userId"),
  isProfileOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, { payload }) {
      state.uid = payload.uid;
      localStorage.setItem("userId", state.uid);
    },
    userLogout(state) {
      state.uid = "";
      localStorage.setItem("userId", "");
    },
    toggelProfile(state, { payload }) {
      state.isProfileOpen = payload;
    },
  },
});

export const { userLogin, userLogout, toggelProfile } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { LoginResponse } from "../../../models/User/user";

interface UserState {
  isLoggedIn: boolean;
  name: String;
  avatar?: String;
  email?: String;
  userId?: String;
  userType?: String;
  pushNoti?: String;
  [key: string]: any;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: "",
  avatar: "",
  email: "",
  userId: "",
  userType: "",
  pushNoti: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Login Success
     */
    login(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.name = action.payload.realUserName;
      state.avatar = action.payload.profile_image;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.userType = action.payload.user_type;
      state.pushNoti = action.payload.web_push_noti_type;
    },

    logout(state) {
   
      state.isLoggedIn = false;
      state.name = "";
      state.avatar = "";
      state.email = "";
      state.userId = "";
      state.userType = "";
      state.pushNoti = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

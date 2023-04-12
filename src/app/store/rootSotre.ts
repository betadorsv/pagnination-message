import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../layouts/Login/loginSlice";
import channelReducer from "../../hooks/channelSlice";
import messageSlice from "../../hooks/messageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    messages: messageSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

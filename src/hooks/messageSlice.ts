import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  data: any;
  newMessage: any;
  isLoading: boolean;
  [key: string]: any;
}

const initialState: SocketState = {
  data: null,
  newMessage: {},
  isLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getListmessage(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.isLoading = false;
    },
    getNewMessage(state, action: PayloadAction<any>) {
      state.newMessage = action.payload;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },
    removeListMessage(state) {
      state.data = null;
    },
  },
});

export const { getListmessage, removeListMessage, getNewMessage , setIsLoading} =
  messagesSlice.actions;

export default messagesSlice.reducer;

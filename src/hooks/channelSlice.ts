import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  data: any;
  channelInfo: any;
  roomId:string;
  [key: string]: any;
}

const initialState: SocketState = {
  data: null,
  channelInfo: null,
  roomId:""
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    getListChannel(state, action: PayloadAction<any>) {
      state.data = action.payload.params;
    },
    getChannelInfo(state, action: PayloadAction<any>) {
      state.channelInfo = action.payload;
      state.roomId=action.payload?.roomId
    },
    error(state) {
      state.data = null;
    },
  },
});

export const { getListChannel, error, getChannelInfo } = channelSlice.actions;

export default channelSlice.reducer;

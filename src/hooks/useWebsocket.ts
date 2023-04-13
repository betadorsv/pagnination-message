import { AppDispatch, RootState } from "../app/store/rootSotre";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { setLoginLocalStorage, signOutLocalStorage } from "../utils/LoginUtils";
import * as ptCommand from "../constants/ptCommant";
import * as ptGroup from "../constants/ptGroup";
import { LastMessageSocket } from "../models/socket";
import { getChannelInfo, getListChannel } from "./channelSlice";
import { login } from "../layouts/Login/loginSlice";
import { getListmessage } from "./messageSlice";

const SOCKET_URL = "wss://moeme-web-dev.aveapp.com";
export const useSocket = () => {
  const [socketUrl, setSocketUrl] = useState(SOCKET_URL);
  const listMessage: any = useSelector(
    (state: RootState) => state.messages?.data
  );
  const roomId: any = useSelector((state: RootState) => state.channel.roomId);

  const dispatch = useDispatch<AppDispatch>();
  let history = useHistory();

  /**
   * init Socket
   */
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"), // on Socket Open
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  const loginSuccess = (data: LastMessageSocket) => {
    if (data?.result === "success") {
      dispatch(login(data?.params)); //save infor user into redux
      setLoginLocalStorage(data?.params); // save info (access token) in to localstorage
      history?.push("/home");
      handleGetListChannel();
    } else {
      toast.error(data?.result); // show message error
    }
  };

  const getListChannelSuccess = (data: LastMessageSocket) => {
    if (data?.result === "success") {
      dispatch(getListChannel(data)); // save list channel in to redux
    } else {
      toast.error(data.result);
    }
  };

  /**
   * Send param get list Channel
   */
  const handleGetListChannel = () => {
    let userId = localStorage.getItem("userId");
    let param = {
      ptGroup: ptGroup.CHANNEL_LISTS,
      ptCommand: ptCommand.CHANNEL_LISTS,
      params: {
        userId: userId,
      },
    };
    sendJsonMessage(param);
  };

  /**
   *
   * @param data Last message socket
   */
  const regsiterSocketSuccess = (data: LastMessageSocket) => {
    if (data?.result === "success") {
      // handleGetListChannel();
    } else {
      toast.error(data?.reason || "Pls check token and try again");
    }
  };

  const createChannelSuccess = (data: LastMessageSocket) => {
    if (data?.result === "success") {
      toast.success("Create channel success.");
      handleGetListChannel(); //get and  update listchannel after create success
    } else {
      toast.error(data.reason || "Create channel error");
    }
  };

  const recvMessage = (message: any) => {
    if(message){
    const newListMessage = [...listMessage, message];
    if (message?.roomId === roomId) {
      dispatch(getListmessage(newListMessage));
    }}
  };

  const getListMessage = (data: LastMessageSocket) => {
    if (data?.result === "success") {
      dispatch(getListmessage(data?.params));
    } else {
      dispatch(getListmessage([]));
    }
  };

  /**
   * Check socket message no have ptCommand
   * @param data
   */
  const checkMessageResponse = (data: LastMessageSocket) => {
    if (data?.result === "error") {
      if (data.reason === "token_invalid") {
        toast.error("Token invalid pls login again");
        signOutLocalStorage();
        history.push("/login");
      }
    }
  };

  const getChannelInfoSuccess = (data: LastMessageSocket) => {
    if (data?.result === "success") {
      dispatch(getChannelInfo(data?.params));
    } else {
      console.log("Not found");
    }
  };

  /**
   * On Listen socket message event
   */
  useEffect(() => {
    if (lastJsonMessage) {
      let message: LastMessageSocket = lastJsonMessage;
      switch (message?.ptCommand) {
        case ptCommand.LOGIN: // Create Channel
          loginSuccess(lastJsonMessage);
          break;
        case ptCommand.CHANNEL_LISTS: // Get List Channel
          getListChannelSuccess(lastJsonMessage);
          break;
        case ptCommand.REGISTER_SOCKET: // Regsiter Socket
          regsiterSocketSuccess(lastJsonMessage);
          break;
        case ptCommand.CREATE_ROOM_CHANNEL: // createRoom Socket
          createChannelSuccess(lastJsonMessage);
          break;
        case 327681: //get list message
          getListMessage(lastJsonMessage);
          break;
        case 327686: // reciver messsage
          recvMessage(lastJsonMessage);
          break;
        case 262153:
          getChannelInfoSuccess(lastJsonMessage);
          break;
        default:
          checkMessageResponse(lastJsonMessage);
          break;
      }
    }
  }, [lastJsonMessage]);
  return {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  };
};

import ListChannel from "components/ListChannel";
import { useSocket } from "../../hooks/useWebsocket";
import * as ptCommand from "../../constants/ptCommant";
import * as ptGroup from "../../constants/ptGroup";

import React, { useEffect } from "react";
import "./channel.scss";
import FormCreateChannel from "components/FormCreateChannel";
import AddChannel from "components/AddChannel";
import TabChat from "components/TabChat";
import { LastMessageSocket } from "../../models/socket";
import toast from "react-hot-toast";
export default function Channel() {
  const { sendJsonMessage, lastJsonMessage } = useSocket();

  /**
   * Register socket before send message
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

  const registerSocket = () => {
    let atk = localStorage.getItem("atk"); //accessToken
    let param = {
      ptCommand: ptCommand.REGISTER_SOCKET,
      ptGroup: ptGroup.REGISTER_SOCKET,
      ptDevice: "",
      params: {
        atk: atk,
      },
    };
    sendJsonMessage(param);
  };

  /**
   *
   * @param data Last message socket
   */
  const regsiterSocketSuccess = (data: LastMessageSocket) => {
    if (data.result === "success") {
      handleGetListChannel();
    } else {
      toast.error(data.reason || "Pls check token and try again");
    }
  };
  useEffect(() => {
    registerSocket();
  }, []);

  /**
   * On Listen socket message event
   */
  useEffect(() => {
    if (lastJsonMessage) {
      let message: LastMessageSocket = lastJsonMessage;
      switch (message?.ptCommand) {
        case ptCommand.REGISTER_SOCKET: // Regsiter Socket
          regsiterSocketSuccess(lastJsonMessage);
          break;
        default:
          break;
      }
    }
  }, [lastJsonMessage]);
  return (
    <div className="channel">
      <div className="channel-list">
        <div className="channel--title">
          <h5>List Channels</h5>
          <AddChannel />
        </div>
        <ListChannel />
      </div>
      <div className="channel-chat">
        <TabChat />
      </div>
    </div>
  );
}

import { useSocket } from "../../hooks/useWebsocket";
import React, { useEffect } from "react";
import { getImageChannel, getImageUser } from "../../utils";
import "./listItem.scss";
import * as ptCommand from "../../constants/ptCommant"
import * as ptGroup from "../../constants/ptGroup"


interface ItemChannelProps {
  channel: any;
  activeRoomType: string;
  handleGetListChat : (data:any) => void;
}

const renderTagChannel = (channelType: string, activeRoomType: string) => {
  switch (channelType) {
    case "STO":
      return (
        <div className="channel-tag">
          <div className="channel-tag--icon yellow"></div>
          <p>Co phan</p>
        </div>
      );
      break;
    case "ORG":
      return (
        <div className="channel-tag">
          <div className="channel-tag--icon red"></div>
          <p>Co Quan</p>
        </div>
      );
    case "PER":
      return (
        <div className="channel-tag">
          <div className="channel-tag--icon blue"></div>
          <p>Ca nhan</p>
        </div>
      );
    case "SPL":
      return (
        <div className="channel-tag">
          <div className="channel-tag--icon green"></div>
          <p>Chuyen gia</p>
        </div>
      );
    case "":
      return (
        <div className="channel-tag">
          <div className="channel-tag--icon blue"></div>
          <p>Ca nhan</p>
        </div>
      );

    default:
      break;
  }
};

function ItemChannel({ channel, activeRoomType, handleGetListChat }: ItemChannelProps) {
  

  return (
    <div className="channel-item" onClick={()=> handleGetListChat(channel)}>
      <div className="channel-item--content">
        <div className="channel-item--content--thumnail">
          <img
            height={100}
            src={getImageChannel(channel?.room_profile_image)}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://cdn-icons-png.flaticon.com/512/5675/5675392.png";
            }}
          />
        </div>
        <div className="channel-item--content--info">
          <h5>
            {channel?.room_name.length > 0 ? channel?.room_name : "No Name"}
          </h5>
          <>{renderTagChannel(channel?.chnl_type, activeRoomType)}</>
        </div>
      </div>
      <div className="channel-item--footer">
        <div className="channel-item--footer--left">
          <img
            height={10}
            src={getImageUser(channel?.ownerId, channel?.roomId)}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://cdn-icons-png.flaticon.com/512/3293/3293466.png";
            }}
          />
          <p>{channel?.title || ""}</p>
        </div>
        <div className="channel-item--footer--right">
          <span>Subscriber buys</span>
          <p>{channel?.userCount || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemChannel;

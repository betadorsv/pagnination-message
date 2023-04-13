import React from "react";
import "./messages.scss";

export interface MessageProps {
  message: any;
  isComming: boolean;
}

export default function Message({ message, isComming }: MessageProps) {
  return (
    <div className="message-container ">
      {isComming && (
        <div className="message-container--sender">
          <img
            src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
            alt=""
          />
          <h5>
            {message?.senderName === "" ? "No Name" : message?.senderName}
          </h5>
        </div>
      )}
      <div
        className={`message-container--content  ${
          isComming ? "iscoming" : "goingout"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Input, Radio, Select, TextArea } from "semantic-ui-react";
import { v1 as uuidv1 } from "uuid";
import * as ptCommand from "../../constants/ptCommant";
import * as ptGroup from "../../constants/ptGroup";
import { useSocket } from "../../hooks/useWebsocket";
import "./formCreateChannel.scss";

const roomTypes = [
  // { key: "1", text: "1:1 chat room", value: "1" },
  { key: "2", text: "Multi user chat room", value: "2" },
  // { key: "3", text: "Open chat room", value: "3" },
  // { key: "4", text: "Public open chat room", value: "4" },
  // { key: "5", text: "Myself chat room", value: "5" },
  // { key: "6", text: "Notice chat room", value: "6" },
];

export interface FormCreateChannelProps {
  show: boolean;
  handleClose: () => void;
}

export default function FormCreateChannel({
  show,
  handleClose,
}: FormCreateChannelProps) {
  const [roomName, setRoomName] = useState<string>("");
  const [roomComment, setRoomComment] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("2");
  const [openType, setOpenType] = useState<string>("1");
  const { lastJsonMessage, sendJsonMessage } = useSocket();

  const handleChangeRoomName = (e) => {
    if (e.target.value.length < 20) {
      setRoomName(e.target.value);
    } else {
      let strimName = e.target.value?.slice(0, 20);
      setRoomName(strimName);
    }
  };

  const handleChangeRoomType = (e, { value }) => {
    setRoomType(value);
  };

  const handleChangeOpenType = (e, { value }) => {
    setOpenType(value);
  };

  const handleChangeRoomComment = (e, { value }) => {
    setRoomComment(value);
  };

  const resetDataForm = () => {
    setRoomName("");
    setOpenType("1");
    setRoomComment("");
    setRoomType("2");
  };

  /**
   * Send param create room channel
   */
  const handleCreateRoom = () => {
    let userId = localStorage.getItem("userId");
    let paramCreateChannel = {
      ptCommand: ptCommand.CREATE_ROOM_CHANNEL,
      ptGroup: ptGroup.CREATE_ROOM_CHANNEL,
      ptDevice: "",
      params: {
        enableWriteMsg: "0",
        roomProfileImage: "",
        roomId: uuidv1(),
        roomName: roomName,
        roomComment: roomComment,
        enableSearch: "1",
        roomType: Number(roomType),
        chnl_open_type: openType,
        maxUser: "2000",
        userId: userId,
      },
    };
    sendJsonMessage(paramCreateChannel);
    resetDataForm();
  };

  /**
   * Register socket before send message
   */
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

  useEffect(() => {
    registerSocket();
  }, []);
  return (
    <Modal show={show} onHide={handleClose}>
      <div className="modal-add-channel">
        <div className="modal-add-channel--title">
          <h5> Create New Channel</h5>
        </div>
        <div className="modal-add-channel--box">
          {/* <h1>Create Channel Room</h1> */}
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Room Name"
                placeholder="Room Name"
                onChange={handleChangeRoomName}
                value={roomName}
              />

              <Form.Field
                control={Select}
                onChange={handleChangeRoomType}
                value={roomType}
                label="Room Type"
                disabled
                options={roomTypes}
                placeholder="Room Type"
              />
            </Form.Group>
            <Form.Group inline>
              <label>Channel Open Type</label>
              <Form.Field
                control={Radio}
                label="Private"
                value="0"
                onChange={handleChangeOpenType}
                checked={openType === "0"}
              />
              <Form.Field
                control={Radio}
                label="Public"
                value="1"
                onChange={handleChangeOpenType}
                checked={openType === "1"}
              />
            </Form.Group>
            <Form.Field
              control={TextArea}
              label="Room Comment"
              onChange={handleChangeRoomComment}
              value={roomComment}
              placeholder="Tell us more about room..."
            />
          </Form>
          <div className="btn">
            <button className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn-submit" onClick={handleCreateRoom}>
              Create
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

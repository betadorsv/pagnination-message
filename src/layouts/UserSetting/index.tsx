import { AppDispatch } from "app/store/rootSotre";
import { error } from "../../hooks/channelSlice";
import { logout } from "../Login/loginSlice";

import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOutLocalStorage } from "../../utils";
import "./userSetting.scss";
export default function UserSetting() {
  let history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  //
  const handleLogout = () => {
    signOutLocalStorage();
    dispatch(error());
    dispatch(logout());
    history.push("/login");
  };
  return (
    <div className="user-setting">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

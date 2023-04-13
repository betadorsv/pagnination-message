import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container">
      <NavLink to={"/home"} activeClassName="actived">
        <img
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/9187/9187555.png"
          alt=""
        />
      </NavLink>
      <NavLink to={"/channel"} activeClassName="actived">
        <img
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/9923/9923536.png"
          alt=""
        />
      </NavLink>
      <NavLink to={"/conversation"} activeClassName="actived">
        <img
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/9383/9383558.png"
          alt=""
        />
      </NavLink>
      <NavLink to={"/setting"} activeClassName="actived">
        <img
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/9069/9069049.png"
          alt=""
        />
      </NavLink>
      <NavLink to={"/channel-talk"} activeClassName="actived">
        <img
          height={30}
          src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
          alt=""
        />
      </NavLink>
    </div>
  );
}

export default Navbar;

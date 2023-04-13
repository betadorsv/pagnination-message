import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import * as ptCommand from "../../constants/ptCommant";
import * as ptGroup from "../../constants/ptGroup";
import { useSocket } from "../../hooks/useWebsocket";
import "./login.scss";

export default function Login() {
  let history = useHistory();
  const { sendJsonMessage } = useSocket();

  /**
   * Check empty and send param login socket
   * @param e
   */
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (e.target[1].value.length <= 0 || e.target[0].value.length <= 0) {
      toast.error("khong duoc de trong");
    } else {
      let param = {
        ptGroup: ptGroup.LOGIN,
        ptCommand: ptCommand.LOGIN,
        params: {
          userId: e.target[0].value,
          userPassword: e.target[1].value,
          deviceType: "web",
        },
      };
      sendJsonMessage(param);
    }
  };

  useEffect(() => {
    const isLoggedIn: boolean = localStorage.getItem("atk") ? true : false;
    // if (isLoggedIn) {
    //   history.push("/home");
    // }
  }, []);

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container--cover">
          <img
            src="https://cdn.wallpapersafari.com/55/39/UlXoaq.jpg"
            alt=""
          />
        </div>
        <form className="auth-container--form" onSubmit={handleLogin}>
          <div className="auth-container--form-content">
            <h3 className="auth-form-title">
              Welcom Back <span>MoeMe</span>
            </h3>
            <div className="form-group mt-3">
              <label>User ID</label>
              <input
                type="text"
                name="userId"
                className="form-control mt-1"
                placeholder="Enter User Id"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

import Navbar from "components/Navbar";
import Channel from "../Channel";
import React, { useEffect } from "react";
import {
  match,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import FormCreateChannel from "../../components/FormCreateChannel";
import ListChannel from "../../components/ListChannel";
import "./Homepage.scss";
import UserSetting from "../UserSetting";
import ChannelTalk from "../channelTalk";

function index() {
  let history = useHistory();
  const match = useRouteMatch();
  useEffect(() => {
    const isLoggedIn: boolean = localStorage.getItem("atk") ? true : false;
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div>
        <Switch>
          <Route path={`/channel`}>
            {/* Tab groups */}
            <Channel />
          </Route>

          <Route path={`/conversation`}>{/* Tab conversation (1-1) */}</Route>

          <Route path={`/setting`}>
            <UserSetting />
          </Route>
          <Route path={`/channel-talk`}>
            <ChannelTalk/>
          </Route>

          {/* <Route component={EmptyPage} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default index;

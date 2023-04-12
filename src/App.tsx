import LoginView from "layouts/Login";
import HomeView from "layouts/Home";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import store from "./app/store/rootSotre";

import { Provider } from "react-redux";


import Header from "../src/components/Header";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Toaster } from "react-hot-toast";
import Channel from "./layouts/Channel";

const ContentWrapper = ({ children }: any) => (
  <div className="content-page">{children}</div>
);

function MoeMe() {
  return (
    <Router>
      <Header />
      <ContentWrapper>
        <Switch>
          <Route path="/login">
            <LoginView />
          </Route>

          <Route path="/">
            <HomeView />
          </Route>
          {/* <Route path="/channel">
            <Channel />
          </Route> */}
          {/* <Redirect path="*" to="/login" /> */}
        </Switch>
      </ContentWrapper>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MoeMe />
    </Provider>
  );
}

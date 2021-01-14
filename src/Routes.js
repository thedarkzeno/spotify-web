import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, login } from "./Services/auth";
import { authEndpoint, redirectUri, scopes } from "./Services/api";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import { SetRefresh } from "./Store/actions";
import { Button, Link } from "./styles/spotify";

export default function Routes() {
  const ReduxState = useSelector((state) => state);
  const Dispatch = useDispatch();
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if (!isAuthenticated()) {
      setLogged(false);
      if (ReduxState.refresh === true) {
        Dispatch(SetRefresh(false));
      }
      const windowUrl = window.location.hash;
      const params = new URLSearchParams(windowUrl.replace("#", "?"));
      const access_token = params.get("access_token");
      const expires_in = params.get("expires_in");

      if (access_token !== null) {
        login(access_token, expires_in);
        setLogged(true);
        window.location.hash = "";
      }
    } else {
      setLogged(true);
    }
  }, [ReduxState.refresh, Dispatch]);

  if (!logged) {
    return (
      <div style={{ paddingTop: "25%" }}>
        <Link
          href={`${authEndpoint}client_id=${
            process.env.REACT_APP_CLIENT_ID
          }&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          <Button>Login to Spotify</Button>
        </Link>
      </div>
    );
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Logout">
            <Logout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

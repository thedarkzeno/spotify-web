import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Services/auth";
import { SetRefresh } from "../Store/actions";

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    logout();
    dispatch(SetRefresh(true));
    history.push("/");
  }, []);
  return <></>;
};

export default Logout;

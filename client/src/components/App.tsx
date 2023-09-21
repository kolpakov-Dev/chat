import "../assets/scss/main.scss";
import Auth from "./Auth/Auth";
import Chat from "./Chat/Chat";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { getUser } from "../store/redusers/user/ActionCreater";
import Preloader from "./Preloader";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser(""));
  }, []);

  const { user } = useAppSelector((state) => state.userReducer);
  return <div className="content">{user == null ? <Auth /> : <Chat />}</div>;
};

export default App;

import PanelContent from "./PanelContent";
import UserBlock from "./UserBlock";
import { useAppDispatch } from "../../../hooks/redux";
import { fetchChats } from "../../../store/redusers/chat/ActionCreater";
import { useEffect } from "react";
import { fetchFriends } from "../../../store/redusers/friends/ActionCreater";
const LeftPanel = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats(""));
    dispatch(fetchFriends(""));
  }, []);
  return (
    <div className="leftPanel">
      <UserBlock />
      <PanelContent />
    </div>
  );
};

export default LeftPanel;

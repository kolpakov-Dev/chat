import React from "react";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoSidebarCollapse } from "react-icons/go";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  showTabVal: boolean;
  showTabFunc: Function;
}

const HeaderChat = (tab: Props) => {
  const { selectedChat } = useAppSelector((state) => state.ChatsReducer);
  return (
    <div className="rightPanelHeader">
      <div className="rightPanelHeaderBody">
        <div
          className="titles"
          onClick={() => tab.showTabFunc(!tab.showTabVal)}
        >
          <h2>{selectedChat?.title}</h2>
          <p>Users in chat - {selectedChat?.users.length}</p>
        </div>
        <div className="settings">
          <GoSidebarCollapse
            className={tab.showTabVal ? "active" : ""}
            onClick={() => tab.showTabFunc(!tab.showTabVal)}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderChat;

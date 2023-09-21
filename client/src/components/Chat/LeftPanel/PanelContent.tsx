import React, { useState } from "react";
import ChatList from "./chatList";
import {
  PiChatsFill,
  PiChatsLight,
  PiUsersLight,
  PiUsersFill,
} from "react-icons/pi";
import { TbSettings, TbSettingsFilled } from "react-icons/tb";
import PanelSettings from "./panelSettings";
import FriendList from "./friendList";
const PanelContent = () => {
  const [currComponent, setCurComponent] = useState(<ChatList />);
  const [currComponentTitle, setCurComponentTitle] = useState("Chats");

  return (
    <div className="panelContent">
      <h3>{currComponentTitle}</h3>
      {currComponent}
      <div className="LeftPanelMenu">
        <div
          className={
            currComponentTitle === "Chats" ? "active menuItem" : "menuItem"
          }
          onClick={() => {
            setCurComponent(<ChatList />);
            setCurComponentTitle("Chats");
          }}
        >
          {currComponentTitle === "Chats" ? <PiChatsFill /> : <PiChatsLight />}
        </div>
        <div
          className={
            currComponentTitle === "Friends" ? "active menuItem" : "menuItem"
          }
          onClick={() => {
            setCurComponent(<FriendList />);
            setCurComponentTitle("Friends");
          }}
        >
          {currComponentTitle === "Friends" ? (
            <PiUsersFill />
          ) : (
            <PiUsersLight />
          )}
        </div>
        <div
          className={
            currComponentTitle === "Settings" ? "active menuItem" : "menuItem"
          }
          onClick={() => {
            setCurComponent(<PanelSettings />);
            setCurComponentTitle("Settings");
          }}
        >
          {currComponentTitle === "Settings" ? (
            <TbSettingsFilled />
          ) : (
            <TbSettings />
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelContent;

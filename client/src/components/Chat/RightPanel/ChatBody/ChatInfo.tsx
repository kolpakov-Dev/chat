import React from "react";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { useAppSelector } from "../../../../hooks/redux";
interface Props {
  showTabFunc: Function;
}
const ChatInfo = ({ showTabFunc }: Props) => {
  const { selectedChat } = useAppSelector((state) => state.ChatsReducer);
  return (
    <div className="rightPanelChatInfo">
      <div className="rightPanelChatInfoWrap">
        <div className="rightPanelChatInfoHeader">
          <h3>{selectedChat?.title} Chat</h3>
          <AiOutlineClose onClick={() => showTabFunc(false)} />
        </div>
        <div className="rightPanelChatInfoBody">
          <div className="rightPanelChatInfoBodyItem">
            <AiOutlineUser />
            <p>{selectedChat?.users.length} users</p>
          </div>
          <div className="rightPanelChatInfoBodyItem">
            <RxExit />
            <p>Leave Chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;

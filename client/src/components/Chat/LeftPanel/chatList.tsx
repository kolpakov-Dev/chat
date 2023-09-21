import SingleRoom from "./singleRoom";
import { useAppSelector } from "../../../hooks/redux";
const ChatList = () => {
  const { chats } = useAppSelector((state) => state.ChatsReducer);
  return (
    <div className="chatList">
      {chats.map((elem) => {
        return <SingleRoom key={elem.id} chat={elem} />;
      })}
    </div>
  );
};

export default ChatList;

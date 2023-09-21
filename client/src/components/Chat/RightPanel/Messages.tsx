import Message from "./Message";
import { useAppSelector } from "../../../hooks/redux";
import { IChat, IFriend } from "../../../interfaces/chat";
import { useEffect, useState } from "react";
interface props {
  selectedType: string;
}
const Messages = ({ selectedType }: props) => {
  const { selectedChat } = useAppSelector((state) => state.ChatsReducer);
  const { selectedFriend } = useAppSelector((state) => state.FriendsReducer);
  const [dataByType, setDataByType] = useState<IChat | IFriend | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectedType == "friend") {
      setDataByType(selectedFriend);
    }
    if (selectedType == "chat") {
      setDataByType(selectedChat);
    }
  }, [selectedType, selectedChat, selectedFriend]);

  return (
    <div className="messagesList">
      {dataByType?.messages.map((element, index) => {
        return <Message key={index} message={element} />;
      })}
    </div>
  );
};

export default Messages;

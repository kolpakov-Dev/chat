import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "../../../../hooks/redux";
interface Props {
  showTabFunc: Function;
}
const FriendInfo = ({ showTabFunc }: Props) => {
  const { selectedFriend } = useAppSelector((state) => state.ChatsReducer);
  return (
    <div className="rightPanelChatInfo">
      <div className="rightPanelChatInfoWrap">
        <div className="rightPanelChatInfoHeader">
          <h3>Friend</h3>
          <AiOutlineClose onClick={() => showTabFunc(false)} />
        </div>
        <div className="rightPanelChatInfoBody"></div>
      </div>
    </div>
  );
};

export default FriendInfo;

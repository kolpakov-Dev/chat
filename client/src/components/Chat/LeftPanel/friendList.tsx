import { useAppSelector } from "../../../hooks/redux";
import SingleFriend from "./singleFriends";
const FriendList = () => {
  const { friends, error } = useAppSelector((state) => state.FriendsReducer);
  console.log(friends);
  return (
    <>
      {error ? <p>{error}</p> : <></>}
      <div className="chatList">
        {friends.map((elem) => {
          console.log(elem);
          return <SingleFriend key={elem.id} friend={elem} />;
        })}
      </div>
    </>
  );
};

export default FriendList;

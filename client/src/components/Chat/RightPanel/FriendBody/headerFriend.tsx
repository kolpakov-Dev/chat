import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "../../../../hooks/redux";
import { IUserFriend } from "../../../../interfaces/user";

const HeaderFriend = () => {
  const { selectedFriend } = useAppSelector((state) => state.FriendsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const [friendData, setFriendData] = useState<IUserFriend | undefined>(
    selectedFriend?.usersData.find((userInChat) => {
      return userInChat.id != user?.id;
    })
  );
  useEffect(() => {
    setFriendData(
      selectedFriend?.usersData.find((userInChat) => {
        return userInChat.id != user?.id;
      })
    );
  }, [selectedFriend, user]);

  return (
    <div className="rightPanelHeader">
      <div className="rightPanelHeaderBody friendBody">
        <div className="titles">
          <h2>{friendData?.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default HeaderFriend;

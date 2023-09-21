import React from "react";
import user from "./../../../assets/img/user.png";
import { useAppSelector } from "../../../hooks/redux";
const UserBlock = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  return (
    <div className="userBlock userElement">
      <div className="userElementWrapper">
        <div className="userElementBody">
          <div className="thumbWrap">
            <img src={user?.image} alt="user" />
          </div>

          <h3>{user?.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserBlock;

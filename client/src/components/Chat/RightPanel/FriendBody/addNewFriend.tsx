import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ChatsSlice } from "../../../../store/redusers/chat/chatsSlice";
import { IUserFriend } from "../../../../interfaces/user";
import { addNewFriends } from "../../../../store/redusers/user/ActionCreater";
const AddNewFriend = () => {
  const { hideAddNewFriendPopup } = ChatsSlice.actions;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  const { users } = useAppSelector((state) => state.UsersReducer);
  const [search, changeSearch] = useState("");
  const [friends, setFriends] = useState<IUserFriend[] | []>([]);
  const [newFriends, changeNewFriend] = useState<IUserFriend[] | []>([]);
  useEffect(() => {
    setFriends(users);
    changeNewFriend(user?.friends || []);
  }, [users]);

  const AddNewUserEvent = () => {
    if (newFriends.length && user) {
      dispatch(
        addNewFriends({
          data: { user: user, friends: newFriends },
        })
      );
      dispatch(hideAddNewFriendPopup());
      changeNewFriend([]);
    }
  };
  const searchUserEvent = (searchVal: string) => {
    if (search == "") {
      setFriends(users);
      return;
    }
    const arr = users.filter((elem) => {
      return elem.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setFriends(arr);
  };
  const selecUserEvent = (friend: IUserFriend) => {
    const index = newFriends.findIndex(
      (elem: IUserFriend) => elem.id == friend.id
    );

    if (index == -1) {
      changeNewFriend([...newFriends, friend]);
    } else {
      const arr = newFriends.filter((elem) => {
        return elem.id != friend.id;
      });
      changeNewFriend(arr);
    }
  };
  return (
    <div className="createChatPopup">
      <AiOutlineCloseCircle
        className="closePopUp"
        onClick={() => {
          dispatch(hideAddNewFriendPopup());
        }}
      />
      <h3>Add new Friend:</h3>
      <div className="inputItem">
        <input
          type="text"
          placeholder="Start input user name"
          value={search}
          onChange={(e) => {
            changeSearch(e.target.value);
            searchUserEvent(e.target.value);
          }}
        />
        <AiOutlineUser />
      </div>
      <div className="selectItemBlock">
        <div className="selectBody">
          {friends.map((elem: IUserFriend) => {
            const selected = newFriends.findIndex((newFriend) => {
              return elem.id == newFriend.id;
            });
            return (
              <div
                key={elem.id}
                className={
                  selected == -1 ? "selectItem" : "selectItem selected"
                }
                onClick={() => {
                  selecUserEvent(elem);
                }}
              >
                <div className="selectItemBody">
                  <img src={elem.image} alt={elem.name} />
                  <p>{elem.name}</p>
                </div>
                <div className="select"></div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="btn createChatBtn"
        onClick={() => {
          AddNewUserEvent();
        }}
      >
        Create
      </div>
    </div>
  );
};

export default AddNewFriend;

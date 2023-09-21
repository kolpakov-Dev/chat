import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { RiChatNewLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ChatsSlice } from "../../../../store/redusers/chat/chatsSlice";
import { createChat } from "../../../../store/redusers/chat/ActionCreater";
import { IUserFriend } from "../../../../interfaces/user";
const CreateChat = () => {
  const { hideCreateChatPopup } = ChatsSlice.actions;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  const [chatTitle, changeChatTitle] = useState("");
  const [friends] = useState(user?.friends || []);
  const [selectedFriends, setSelectedFriends] = useState<IUserFriend[] | []>(
    []
  );
  const createChatEvent = () => {
    if (chatTitle && user) {
      dispatch(
        createChat({
          data: {
            title: chatTitle,
            userUID: user?.id,
            friends: [
              ...selectedFriends,
              { id: user.id, image: user.image, name: user.name },
            ],
          },
        })
      );
      dispatch(hideCreateChatPopup());
    }
  };
  const selectUserEvent = (friend: IUserFriend) => {
    const index = selectedFriends.findIndex(
      (elem: IUserFriend) => elem.id == friend.id
    );

    if (index == -1) {
      setSelectedFriends([...selectedFriends, friend]);
    } else {
      const arr = selectedFriends.filter((elem) => {
        return elem.id != friend.id;
      });
      setSelectedFriends(arr);
    }
  };
  return (
    <div className="createChatPopup">
      <AiOutlineCloseCircle
        className="closePopUp"
        onClick={() => {
          dispatch(hideCreateChatPopup());
        }}
      />
      <h3>Create Chat:</h3>
      <div className="inputItem">
        <input
          type="text"
          placeholder="Chat name"
          value={chatTitle}
          onChange={(e) => {
            changeChatTitle(e.target.value);
          }}
        />
        <RiChatNewLine />
      </div>
      <div className="selectItemBlock">
        <p>Add friends to new chat:</p>
        <div className="selectBody">
          {friends.length ? (
            friends.map((elem, itemIndex) => {
              const selected = selectedFriends.findIndex((selectedFriend) => {
                return elem.id == selectedFriend.id;
              });
              return (
                <div
                  key={elem.id}
                  className={
                    selected == -1 ? "selectItem" : "selectItem selected"
                  }
                  onClick={() => selectUserEvent(elem)}
                >
                  <div className="selectItemBody">
                    <img src={elem.image} alt={elem.name} />
                    <p>{elem.name}</p>
                  </div>
                  <div className="select"></div>
                </div>
              );
            })
          ) : (
            <p>Users dont find :(</p>
          )}
        </div>
      </div>
      <div
        className="btn createChatBtn"
        onClick={() => {
          createChatEvent();
        }}
      >
        Create
      </div>
    </div>
  );
};

export default CreateChat;

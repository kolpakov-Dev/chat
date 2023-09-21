import React from "react";
import { IMessageProps } from "../../../../interfaces/chat";

const FromMe = ({ message }: IMessageProps) => {
  return (
    <div className="message fromMessage">
      <div className="messageContent">
        <p>{message.text}</p>
        <span>{message.time}</span>
      </div>
      <div className="messageUserImageWrap">
        <img src={message.user.image} />
      </div>
    </div>
  );
};

export default FromMe;

import React from "react";
import { IMessageProps } from "../../../../interfaces/chat";

const ToMe = ({ message }: IMessageProps) => {
  return (
    <div className="message toMessage">
      <div className="messageUserImageWrap">
        <img src={message.user.image} />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        <span>{message.time}</span>
      </div>
    </div>
  );
};

export default ToMe;

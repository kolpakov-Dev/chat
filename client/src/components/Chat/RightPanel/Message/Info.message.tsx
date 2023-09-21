import React from "react";
import { IMessageProps } from "../../../../interfaces/chat";

const Info = ({ message }: IMessageProps) => {
  return (
    <div className="message infoMessage">
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Info;

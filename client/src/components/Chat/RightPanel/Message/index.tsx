import { useEffect, useRef } from "react";
import { IMessageProps } from "../../../../interfaces/chat";
import FromMe from "./FromMe.message";
import ToMe from "./ToMe.message";
import { useAppSelector } from "../../../../hooks/redux";
import Info from "./Info.message";

const Message = ({ message }: IMessageProps) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const bottomEl = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, []);

  const convertTextMessage = () => {
    const messageDate = message.date.substring(message.date.length - 5);
    if (message.user == user!.id) {
      const messageData = {
        text: message.text,
        time: messageDate,
        user: {
          name: user?.name,
          image: user?.image,
        },
      };
      return <FromMe message={messageData} />;
    }
    const userData = user?.friends.find((friend) => {
      return friend.id == message.user;
    });
    const messageData = {
      text: message.text,
      time: messageDate,
      user: {
        name: userData?.name,
        image: userData?.image,
      },
    };
    return <ToMe message={messageData} />;
  };
  const convertInfoMessage = () => {
    const messageData = {
      text: message.text,
      userName: user?.name,
    };
    return <Info message={messageData} />;
  };

  const getMessageByType = () => {
    switch (message.type) {
      case "message":
        return convertTextMessage();
      case "info":
        return convertInfoMessage();
      default:
        console.log(message);
        return <p className="messageError">Error</p>;
    }
  };
  return (
    <>
      {getMessageByType()}
      <div ref={bottomEl}></div>
    </>
  );
};

export default Message;

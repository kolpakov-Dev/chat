export interface IMessageProps {
  message: any;
}
export enum MessageTypes {
  FromME = "fromMe",
  ToME = "toMe",
  NewUser = "newUser",
  NewDate = "newDate",
  Changes = "changes",
}
export interface IChat {
  id: string;
  title: string;
  owner: string;
  users: string[];
  usersData: IUserFriend[];
  messages: IMessageStore[];
}
export interface IMessageStore {
  date: string;
  text: string;
  user: string;
  type: string;
}
export interface IFriend {
  id: string;
  users: string[];
  usersData: IUserFriend[];
  messages: IMessageStore[];
}
export interface IUserFriend {
  id: string;
  name: string;
  image: string;
}

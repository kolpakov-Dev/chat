export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  friends: IUserFriend[] | [];
}
export interface IUserFriend {
  id: string;
  name: string;
  image: string;
}

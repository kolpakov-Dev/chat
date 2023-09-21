import GoogleIcon from "./../../assets/img/icons/google.svg";
import FacebookIcon from "./../../assets/img/icons/facebook.svg";
import { AiOutlineMail, AiOutlineEye, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { IUserAuthData } from "../../interfaces/auth";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/redusers/user/UserSlice";

interface Props {
  linkFunction: Function;
  changeEmail: Function;
  userData: IUserAuthData;
  changePassword: Function;
  authBtn: Function;
}

const LoginForm = ({
  linkFunction,
  changeEmail,
  userData,
  changePassword,
  authBtn,
}: Props) => {
  const dispatch = useAppDispatch();
  const { clearError } = userSlice.actions;
  const [showPass, changeShowPass] = useState(false);
  return (
    <div className="authForm">
      <h2>Log In</h2>
      <div className="inputItem">
        <input
          type="text"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => changeEmail(e.target.value)}
          onKeyDown={(event) => {
            if (event.code == "Enter") {
              authBtn();
            }
          }}
        />
        <AiOutlineMail />
      </div>
      <div className="inputItem">
        <input
          type={!showPass ? "password" : "text"}
          placeholder="Password"
          value={userData.password}
          onChange={(e) => changePassword(e.target.value)}
          onKeyDown={(event) => {
            if (event.code == "Enter") {
              authBtn();
            }
          }}
        />
        {!showPass ? (
          <AiOutlineEye
            onClick={() => {
              changeShowPass(true);
            }}
          />
        ) : (
          <AiFillEye
            onClick={() => {
              changeShowPass(false);
            }}
          />
        )}
      </div>
      <div className="btn btnAuth" onClick={() => authBtn()}>
        Log In
      </div>
      <p
        className="link"
        onClick={() => {
          dispatch(clearError());
          linkFunction(false);
        }}
      >
        don't have an account? Register
      </p>
    </div>
  );
};

export default LoginForm;

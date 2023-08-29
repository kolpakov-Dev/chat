import GoogleIcon from "./../../assets/img/icons/google.svg";
import FacebookIcon from "./../../assets/img/icons/facebook.svg";
import { AiOutlineMail, AiOutlineEye, AiFillEye } from "react-icons/ai";
import { useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  linkFunction: Function;
}

const LoginForm = ({ linkFunction }: Props) => {
  const [showPass, changeShowPass] = useState(false);
  return (
    <div className="authForm">
      <h2>Log In</h2>
      <div className="socials">
        <div className="social_item">
          <img src={GoogleIcon} alt="google" />
        </div>
        <div className="social_item">
          <img src={FacebookIcon} alt="meta" />
        </div>
      </div>
      <p className="tempText"> or </p>
      <div className="inputItem">
        <input type="text" placeholder="Email" />
        <AiOutlineMail />
      </div>
      <div className="inputItem">
        <input type={!showPass ? "password" : "text"} placeholder="Password" />
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
      <div className="btn btnAuth">Log In</div>
      <p className="link" onClick={() => linkFunction(false)}>
        don't have an account? Register
      </p>
    </div>
  );
};

export default LoginForm;

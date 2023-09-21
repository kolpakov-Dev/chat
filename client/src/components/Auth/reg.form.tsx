import GoogleIcon from "./../../assets/img/icons/google.svg";
import FacebookIcon from "./../../assets/img/icons/facebook.svg";
import {
  AiOutlineMail,
  AiOutlineEye,
  AiFillEye,
  AiOutlineUser,
  AiOutlineFileImage,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/redusers/user/UserSlice";

interface Props {
  linkFunction: Function;
  changeEmail: Function;
  userData: IUserAuthData;
  changePassword: Function;
  changeName: Function;
  changeImage: Function;
  regBtn: Function;
}

const RegForm = ({
  linkFunction,
  changeEmail,
  userData,
  changePassword,
  changeName,
  regBtn,
  changeImage,
}: Props) => {
  const dispatch = useAppDispatch();
  const { clearError } = userSlice.actions;
  const [showPass, changeShowPass] = useState(false);
  return (
    <div className="authForm">
      <h2>Register</h2>
      <div className="inputItem">
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => {
            changeEmail(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code == "Enter") {
              regBtn();
            }
          }}
        />
        <AiOutlineMail />
      </div>
      <div className="inputItem">
        <input
          type="text"
          placeholder="User name"
          value={userData.userName}
          onChange={(e) => {
            changeName(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code == "Enter") {
              regBtn();
            }
          }}
        />
        <AiOutlineUser />
      </div>
      <div className="inputImageItem">
        <div className="inputItem">
          <input
            type="file"
            placeholder="Upload your photo."
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              changeImage(event?.target?.files?.[0]);
            }}
          />
          <AiOutlineFileImage />
        </div>
        {userData.image ? (
          <div className="preview">
            {" "}
            <img
              src={URL.createObjectURL(userData.image)}
              className="previewImg"
            />
            <AiOutlineCloseCircle
              className="deleteImg"
              onClick={() => {
                changeImage(undefined);
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="inputItem">
        <input
          type={!showPass ? "password" : "text"}
          placeholder="Password"
          value={userData.password}
          onChange={(e) => {
            changePassword(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code == "Enter") {
              regBtn();
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
      <div className="btn btnAuth" onClick={() => regBtn()}>
        Register
      </div>
      <p
        className="link"
        onClick={() => {
          dispatch(clearError());
          linkFunction(true);
        }}
      >
        Alredy have an account? Login
      </p>
    </div>
  );
};

export default RegForm;

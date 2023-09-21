import { useEffect, useState } from "react";
import BG from "./../../assets/img/auth_bg1.jpg";
import LoginForm from "./login.form";
import RegForm from "./reg.form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createUser, logIn } from "../../store/redusers/user/ActionCreater";
interface regData {
  email: string;
  userName: string;
  password: string;
  image: File | undefined;
}
const Auth = () => {
  const { error, loading } = useAppSelector((state) => state.userReducer);
  const [authFormType, changeAuthFormType] = useState(true);
  const [authPageError, setAuthPageError] = useState<string>(error);
  const [authUserData, changeAuthUserData] = useState<regData>({
    email: "",
    password: "",
    userName: "",
    image: undefined,
  });
  useEffect(() => {
    setAuthPageError(error);
  }, [error]);

  const changeUserName = (userNameUpdate: string) => {
    changeAuthUserData({ ...authUserData, userName: userNameUpdate });
    setAuthPageError("");
  };
  const changeUserEmail = (userEmailUpdate: string) => {
    changeAuthUserData({ ...authUserData, email: userEmailUpdate });
    setAuthPageError("");
  };
  const changeUserPassword = (userPasswordUpdate: string) => {
    changeAuthUserData({ ...authUserData, password: userPasswordUpdate });
    setAuthPageError("");
  };
  const changeUserImage = (userImageUpdate: File) => {
    console.log(userImageUpdate);
    changeAuthUserData({ ...authUserData, image: userImageUpdate });
  };
  const changeAuthForm = (type: boolean) => {
    changeAuthFormType(type);
    setAuthPageError("");
    changeAuthUserData({
      email: "",
      password: "",
      userName: "",
      image: undefined,
    });
  };
  const dispatch = useAppDispatch();
  const regBtn = () => {
    console.log(authUserData);
    if (
      authUserData.email !== "" &&
      authUserData.password !== "" &&
      authUserData.userName !== ""
    ) {
      const formData = new FormData();
      if (authUserData.image != undefined) {
        formData.append("image", authUserData.image, authUserData.image.name);
      }

      formData.append("email", authUserData.email);
      formData.append("password", authUserData.password);
      formData.append("userName", authUserData.userName);
      dispatch(createUser({ data: formData }));
    } else {
      setAuthPageError("Not all data is filled in");
    }
  };
  const authBtn = () => {
    if (authUserData.email !== "" && authUserData.password !== "") {
      dispatch(logIn(authUserData));
    } else {
      setAuthPageError("Not all data is filled in");
    }
  };

  return (
    <>
      {loading ? (
        <div id="preloader">
          <div id="loader"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="AuthPage">
        <img
          src={BG}
          alt="bg"
          className={authFormType ? "authBG active" : "authBG"}
        />
        {authPageError ? <p className="AuthError">{authPageError}</p> : <></>}
        {authFormType ? (
          <LoginForm
            linkFunction={changeAuthForm}
            userData={authUserData}
            changeEmail={changeUserEmail}
            changePassword={changeUserPassword}
            authBtn={authBtn}
          />
        ) : (
          <RegForm
            linkFunction={changeAuthForm}
            userData={authUserData}
            changeEmail={changeUserEmail}
            changePassword={changeUserPassword}
            changeName={changeUserName}
            regBtn={regBtn}
            changeImage={changeUserImage}
          />
        )}
      </div>
    </>
  );
};

export default Auth;

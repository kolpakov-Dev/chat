import { useState } from "react";
import BG from "./../../assets/img/auth_bg1.jpg";
import LoginForm from "./login.form";
import RegForm from "./reg.form";
const Auth = () => {
  const [authFormType, changeAuthFormType] = useState(true);
  const changeAuthForm = (type: boolean) => {
    changeAuthFormType(type);
  };

  return (
    <>
      <div className="AuthPage">
        <img
          src={BG}
          alt="bg"
          className={authFormType ? "authBG active" : "authBG"}
        />
        {authFormType ? (
          <LoginForm linkFunction={changeAuthForm} />
        ) : (
          <RegForm linkFunction={changeAuthForm} />
        )}
      </div>
    </>
  );
};

export default Auth;

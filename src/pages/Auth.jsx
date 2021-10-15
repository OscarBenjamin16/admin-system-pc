import { useState, useEffect } from "react";
import Login from "../components/auth/Login";
import SVGFirst from "../assets/one.svg";
import SVGWave from "../assets/wavev4.svg";
import "./styles/auth.styles.css";
import Register from "../components/auth/Register";
import { EmployeeService } from "../services/employe.service";

const Auth = ({setRefreshCheckLogin}) => {
  const emplService = new EmployeeService();
  const [existUser, setexistUser] = useState();
  const checkIsExist = () => {
    emplService.getUser().then((res) => {
      if (res.ok) {
        setexistUser(true);
        return;
      }
      setexistUser(false);
      return;
    });
  };
  useEffect(() => {
    checkIsExist();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existUser]);
  return (
    <div className="content justify-center content-center grid">
      {typeof existUser === 'undefined' ? (
        <p>Cargando.....</p>
      ) : (
        <>
          <div className="cart-box">
            <div className="section-one grid justify-end content-center">
              {existUser ? <Login setRefreshCheckLogin={setRefreshCheckLogin}/> : <Register setexistUser={setexistUser} />}
              <a href="/forgot" className="text-xs ml-8 text-white">Olvidaste tu password?</a>
            </div>
            <div className="section-two">
              <h1 className="absolute log-text top-28 mt-10 ml-10 font-semibold text-xl">
                M&E Soporte Tecnico Informatico
              </h1>
              <img className="first-svg" src={SVGFirst} alt="none" />
            </div>
          </div>
          <img
            src={SVGWave}
            className="absolute bottom-0 svg-wave"
            alt="none"
          />
        </>
      )}
    </div>
  );
};

export default Auth;

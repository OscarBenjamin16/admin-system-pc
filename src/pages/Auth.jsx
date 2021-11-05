import { useState, useEffect, Suspense } from "react";
import Login from "../components/auth/Login";
import Computer from "../assets/logo-oficial.png";
import "./styles/auth.styles.css";
import Register from "../components/auth/Register";
import { Link } from "react-router-dom";
import { EmployeeService } from "../services/employe.service";

const Auth = ({ setRefreshCheckLogin }) => {
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
    <Suspense fallback={<p>Hola</p>}>
      <div className="content justify-center content-center grid">
        {typeof existUser === "undefined" ? (
          <p className="text-white font-semibold text-base">Cargando.....</p>
        ) : (
          <>
            <div className="back"></div>
            <div className="cart-box">
              <div className="section-one grid justify-end content-center">
                <div className="w-full flex flex-col items-center content-center justify-center">
                  <span className="text-lg mb-5 font-semibold text-gray-600">
                    M&E Soporte Tecnico
                  </span>
                  <img className=" w-40" src={Computer} alt="none" />
                </div>
                {existUser ? (
                  <Login setRefreshCheckLogin={setRefreshCheckLogin} />
                ) : (
                  <Register setexistUser={setexistUser} />
                )}
                <Link to="/forgot" className="text-xs ml-16 md:ml-8 text-blue-500">
                  Olvidaste tu password?
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
};

export default Auth;

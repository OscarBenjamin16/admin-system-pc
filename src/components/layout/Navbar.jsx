import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faListAlt,
  faDesktop,
  faUserCircle,
  faSignOutAlt,
  faTruckMoving,
  faTags,
  faUsers,
  faUserTie,
  faChartBar,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/logo-oficial2.png";

export default function Navbar() {
  const ctx = useAuth();
  const { auth } = ctx;
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Link to="/">
          <p className="text-white font-mono text-md font-bold p-3 cursor-pointer">
            M&E SOPORTE TECNICO
          </p>
        </Link>
        <img src={Logo} alt="x" className=" w-36" />
      </div>
      <div className="mt-4">
        <div className="ml-8">
          <ul>
            <Link to="/">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="mr-3 text-white text-lg"
                  icon={faHome}
                />
                Inicio
              </li>
            </Link>
            <Link to="/product">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="text-white mr-3 text-lg"
                  icon={faDesktop}
                />
                Productos
              </li>
            </Link>
            <Link to="/mark">
              <li className="   text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="   text-white mr-3 text-lg"
                  icon={faListAlt}
                />
                Marcas
              </li>
            </Link>
            <Link to="/category">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="   text-white mr-3 text-lg"
                  icon={faClipboardList}
                />
                Categorias
              </li>
            </Link>
            <Link to="/provider">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="   text-white mr-3 text-lg"
                  icon={faTruckMoving}
                />
                Proveedores
              </li>
            </Link>
            <Link to="/coupons">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon className="text-white mr-3 text-lg" icon={faTags} />{" "}
                Cupones
              </li>
            </Link>
            <Link to="/sales">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="text-white mr-3 text-lg"
                  icon={faChartBar}
                />
                Ventas
              </li>
            </Link>
            <Link to="/reports">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="text-white mr-3 text-lg"
                  icon={faFilePdf}
                />
                Reportes
              </li>
            </Link>
            {auth.role === "admin" && (
              <>
                <Link to="/users">
                  <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                    <FontAwesomeIcon
                      className="text-white mr-3 text-lg"
                      icon={faUsers}
                    />
                    Usuarios
                  </li>
                </Link>
                <Link to="/employee">
                  <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                    <FontAwesomeIcon
                      className="text-white mr-3 text-lg"
                      icon={faUserTie}
                    />
                    Empleados
                  </li>
                </Link>
              </>
            )}
            <Link to="/account">
              <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
                <FontAwesomeIcon
                  className="text-white mr-3 text-lg"
                  icon={faUserCircle}
                />{" "}
                Mi cuenta
              </li>
            </Link>
            <li className="text-white font-mono py-1 text-base font-semibold cursor-pointer">
              <FontAwesomeIcon
                className="   text-white mr-3 text-lg"
                icon={faSignOutAlt}
              />
              Cerrar Sesion
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

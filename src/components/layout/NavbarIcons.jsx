import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faListAlt,
  faDesktop,
  faUserCircle,
  faSignOutAlt,
  faBars,
  faTimes,
  faTruckMoving,
  faTags,
  faUsers,
  faUserTie,
  faChartBar,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { TokenService } from "../../services/token.service";

const NavbarIcons = ({ openMenu, setOpenMenu }) => {
  const tkService = new TokenService();
  const ctx = useAuth();
  const { auth } = ctx;
  const loggoutUser = () => {
    tkService.logout();
    ctx.setRefreshCheckLogin(true);
  };
  return (
    <>
      <ul className="h-screen">
        <li className="p-4">
          {openMenu ? (
            <FontAwesomeIcon
              className="   text-white text-xl cursor-pointer"
              icon={faTimes}
              onClick={() => setOpenMenu(!openMenu)}
            />
          ) : (
            <FontAwesomeIcon
              className="   text-white text-xl cursor-pointer"
              icon={faBars}
              onClick={() => setOpenMenu(!openMenu)}
            />
          )}
        </li>
        <Link to="/">
          <li className="p-3 justify-center content-center flex cursor-pointer">
            <FontAwesomeIcon className="   text-white text-lg" icon={faHome} />
          </li>
        </Link>
        <Link to="/product">
          <li className="p-3 justify-center content-center flex cursor-pointer">
            <FontAwesomeIcon className="text-white text-lg" icon={faDesktop} />
          </li>
        </Link>
        <Link to="/mark">
          <li className="p-3 justify-center content-center flex cursor-pointer">
            <FontAwesomeIcon
              className="   text-white text-lg"
              icon={faListAlt}
            />
          </li>
        </Link>
        <Link to="/category">
          <li className="p-3 justify-center content-center flex cursor-pointer ">
            <FontAwesomeIcon
              className="   text-white text-lg"
              icon={faClipboardList}
            />
          </li>
        </Link>
        <Link to="/provider">
          <li className="p-3 justify-center content-center flex cursor-pointer ">
            <FontAwesomeIcon
              className="   text-white text-lg"
              icon={faTruckMoving}
            />
          </li>
        </Link>
        <Link to="/coupons">
          <li className="p-3 justify-center content-center flex cursor-pointer">
            <FontAwesomeIcon className="text-white text-lg" icon={faTags} />
          </li>
        </Link>
        <Link to="/sales">
          <li className="p-3 justify-center content-center flex cursor-pointer ">
            <FontAwesomeIcon className="text-white text-lg" icon={faChartBar} />
          </li>
        </Link>
        <Link to="/reports">
          <li className="p-3 justify-center content-center flex cursor-pointer ">
            <FontAwesomeIcon className="text-white text-lg" icon={faFilePdf} />
          </li>
        </Link>
        {auth.role === "admin" && (
          <>
            <Link to="/users">
              <li className="p-3 justify-center content-center flex cursor-pointer ">
                <FontAwesomeIcon
                  className="text-white text-lg"
                  icon={faUsers}
                />
              </li>
            </Link>
            <Link to="/employee">
              <li className="p-3 justify-center content-center flex cursor-pointer ">
                <FontAwesomeIcon
                  className="text-white text-lg"
                  icon={faUserTie}
                />
              </li>
            </Link>
          </>
        )}
        <Link to="/account">
          <li className="p-3 justify-center content-center flex cursor-pointer ">
            <FontAwesomeIcon
              className="text-white text-lg"
              icon={faUserCircle}
            />
          </li>
        </Link>
        <li
          onClick={loggoutUser}
          className="p-3 justify-center content-center flex cursor-pointer"
        >
          <FontAwesomeIcon
            className="   text-white text-lg"
            icon={faSignOutAlt}
          />
        </li>
      </ul>
    </>
  );
};

export default NavbarIcons;

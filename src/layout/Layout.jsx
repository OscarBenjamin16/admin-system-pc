import React from "react";
import "./layout.styles.css";
import NavbarIcons from "../components/layout/NavbarIcons";
import NavbarOptions from "../components/layout/NavbarOptions";

const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = React.useState(true);
  return (
    <div className="flex w-screen h-screen">
      <div
        className="icons h-full md:h-screen fixed z-50"
        style={{ transition: "all .5s ease", width: "60px" }}
      >
        <NavbarIcons openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
      <div
        className={
          (openMenu ? "flex" : "hidden") +
          " bg-white menu-options absolute md:static border-solid lg:static xl:static h-screen md:w-3/12 xl:w-2/12 side-bar"
        }
        style={{ marginLeft: "60px" }}
      >
        <div className="flex">
          <NavbarOptions />
        </div>
      </div>
      <div
        className={(openMenu ? "md:w-9/12 xl:9/12" : "w-11/12") + " p-5"}
        style={openMenu ? { marginLeft: "0" } : { marginLeft: "60px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;

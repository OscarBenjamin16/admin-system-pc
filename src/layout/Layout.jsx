import React from "react";
import "./layout.styles.css";
import Navbar from "../components/layout/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <div style={{ background: "#008fcd" }} className="w-72 flex flex-col justify-center h-screen fixed">
        <Navbar />
      </div>
      <div className="ml-80 my-6 w-full mr-8">{children}</div>
    </div>
  );
};

export default Layout;

import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const NavbarOptions = () => {
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <ul>
        <Link to="/">
          <li className="text-white text-md font-bold p-3 cursor-pointer">
            SYSTEM PC
          </li>
        </Link>
        <Link to="/">
          <li className="   text-white text-sm font-semibold p-3 mt-2 cursor-pointer">
            Inicio
          </li>
        </Link>
        <Link to="/product">
          <li className="text-white text-sm font-semibold p-2 cursor-pointer">
            Productos
          </li>
        </Link>
        <Link to="/mark">
          <li className="   text-white text-sm font-semibold p-3 cursor-pointer">
            Marcas
          </li>
        </Link>
        <Link to="/category">
          <li className="text-white text-sm font-semibold p-3 cursor-pointer">
            Categorias
          </li>
        </Link>
        <Link to="/provider">
          <li className="text-white text-sm font-semibold p-3 cursor-pointer">
            Proveedores
          </li>
        </Link>
        <Link to="/coupons">
          <li className="text-white text-sm font-semibold p-3 cursor-pointer">
            Cupones
          </li>
        </Link>
        <Link to="/sales">
          <li className="text-white text-sm font-semibold p-3 cursor-pointer">
            Ventas
          </li>
        </Link>
        <Link to="/users">
          <li className="text-white text-sm font-semibold p-3 cursor-pointer">
            Usuarios
          </li>
        </Link>
        <Link to="/employee">
          <li className="text-white text-sm font-semibold p-3 cursor-pointer">
            Empleados
          </li>
        </Link>
        <Link to="/account">
          <li className="text-white text-sm font-semibold p-3 cursor-pointer">
            Mi cuenta
          </li>
        </Link>
        <li className="text-white text-sm font-semibold p-3 cursor-pointer">
          Cerrar Sesion
        </li>
      </ul>
    </>
  );
};

export default NavbarOptions;

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavbarOptions = () => {
  const ctx = useAuth();
  const { auth } = ctx;
  return (
    <>
      <ul>
        <Link to="/">
          <li className="text-white text-md font-bold p-3 cursor-pointer">
           M&E SOPORTE TECNICO
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
        <Link to="/reports">
          <li className="text-white text-sm font-semibold p-2 px-3 cursor-pointer">
            Reportes
          </li>
        </Link>
        {auth.role === "admin" && (
          <>
            <Link to="/users">
              <li className="text-white text-sm font-semibold p-3 cursor-pointer">
                Usuarios
              </li>
            </Link>
            <Link to="/employee">
              <li className="text-white text-sm font-semibold p-2 px-3 cursor-pointer">
                Empleados
              </li>
            </Link>
          </>
        )}
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

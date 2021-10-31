import React from "react";
import TDComponent from "../global/tables/TDComponent";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DeleteAction from "../global/DeleteAction";
import useAuth from "../../hooks/useAuth";

export default function TableBody({
  products,
  setReload,
  setShowModal,
  setProduct,
  setShowAddStock,
  setProductStock,
}) {
  const { auth } = useAuth();

  const deleteProduct = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteAction
            id={id}
            type="product"
            onClose={onClose}
            setReload={setReload}
          />
        );
      },
    });
  };
  const edit = (product) => {
    setShowModal(true);
    setProduct(product);
  };
  const addStock = (product) => {
    setShowAddStock(true);
    setProductStock(product);
  };
  return (
    <>
      {products &&
        (products?.length > 0 ? (
          products.map((product, index) => (
            <tr key={index}>
              <TDComponent cursor="cursor-pointer">
                <Link to={`/product/${product.id}`}>{product.id}</Link>
              </TDComponent>
              <TDComponent>
                <Link to={`/product/${product.id}`}>
                  {product.nombreProducto}
                </Link>
              </TDComponent>
              <TDComponent name={product.codigo_Producto} />
              <TDComponent>
                <img src={product.image} alt="" />
              </TDComponent>
              <TDComponent name={product.catidad_por_unidad} />
              <TDComponent>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={product.status === 1 ? true : false}
                      className="hidden"
                      readOnly
                      value={product.status}
                    />
                    <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                    <div
                      className={
                        "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                        (product.status && "toggle__dot_active bg-green-400")
                      }
                    ></div>
                  </div>
                  <div className="ml-3 text-gray-700 font-medium">
                    {product.status ? "Activo" : "Inactivo"}
                  </div>
                </label>
              </TDComponent>
              <TDComponent>
                <button
                  onClick={() => edit(product)}
                  className="bg-global p-2 text-xs w-20 rounded mr-4 text-white font-semibold"
                >
                  Editar
                </button>
                {auth.role === "admin" && product.catidad_por_unidad < 1 && (
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-400 p-2 text-xs w-20 rounded text-white font-semibold"
                  >
                    Eliminar
                  </button>
                )}
                {product.catidad_por_unidad < 1 && (
                  <button
                    onClick={() => addStock(product)}
                    className="bg-green-500 ml-4  p-2 text-xs whitespace-nowrap  rounded text-white font-semibold"
                  >
                    Agregar stock
                  </button>
                )}
              </TDComponent>
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <p className="p-5">No hay registros</p>
            </td>
          </tr>
        ))}
    </>
  );
}

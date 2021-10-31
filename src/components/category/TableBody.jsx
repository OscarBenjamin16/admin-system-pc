import React from "react";
import { confirmAlert } from "react-confirm-alert";
import DeleteAction from "../global/DeleteAction";
import TDComponent from "../global/tables/TDComponent";
import { CategoryService } from "../../services/category.service";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function TableBody({
  setCategory,
  setShowModal,
  showModal,
  setReload,
  categories,
}) {
  const categoryService = new CategoryService();
  const { auth } = useAuth();

  const click = (cat) => {
    setCategory(cat);
    setShowModal(!showModal);
  };
  const deleteCategory = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteAction
            id={id}
            onClose={onClose}
            type="category"
            setReload={setReload}
          />
        );
      },
    });
  };
  const change = (id) => {
    const query = {
      id,
    };
    categoryService.changeStatus(query).then((res) => {
      if (res.ok === true) {
        setReload(true);
        id = 0;
      } else {
        toast.error("Error en los datos");
      }
    });
  };
  return (
    <>
      {typeof categories === "undefined" && (
        <p className="p-5 text-xs font-semibold text-gray-600">
          No hay registros para mostrar
        </p>
      )}
      {categories?.map((cat, index) => (
        <tr key={index}>
          <TDComponent name={cat.id} />
          <TDComponent name={cat.categoria} />
          <TDComponent>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={cat.status === 1 ? true : false}
                  className="hidden"
                  onChange={() => change(cat.id)}
                  value={cat.status}
                />
                <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                <div
                  className={
                    "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                    (cat.status && "toggle__dot_active bg-green-400")
                  }
                ></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                {cat.status ? "Activo" : "Inactivo"}
              </div>
            </label>
          </TDComponent>
          <TDComponent>
            <button
              onClick={() => click(cat)}
              className="bg-global p-2 text-xs w-20 rounded mr-4 text-white font-semibold"
            >
              Editar
            </button>
            {auth.role === "admin" && (
              <button
                onClick={() => deleteCategory(cat.id)}
                className="bg-red-400 p-2 text-xs w-20 rounded text-white font-semibold"
              >
                Eliminar
              </button>
            )}
          </TDComponent>
        </tr>
      ))}
    </>
  );
}

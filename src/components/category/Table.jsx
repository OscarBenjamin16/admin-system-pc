import React, { useState } from "react";
import Modal from "../global/modal/Modal";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import DeleteAction from "../global/DeleteAction";
import Form from "./Form";
import { CategoryService } from "../../services/category.service";
import { confirmAlert } from "react-confirm-alert";

const Table = ({ categories, setReload }) => {
  const [category, setCategory] = useState();
  const [showModal, setShowModal] = useState(false);
  const categoryService = new CategoryService();
  const change = (id) => {
    const query = {
      id,
    };
    categoryService.changeStatus(query).then((res) => {
      if (res.ok === true) {
        setReload(true);
        id = 0;
      } else {
        console.log("error al editar datos!");
      }
    });
  };
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
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="ID" />
              <THComponent name="NOMBRE" />
              <THComponent name="Status" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
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
                    className="bg-indigo-700 p-2 text-xs w-20 rounded mr-4 text-white font-semibold"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="bg-red-400 p-2 text-xs w-20 rounded text-white font-semibold"
                  >
                    Eliminar
                  </button>
                </TDComponent>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          title="Editar Categoria"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <Form
            oldCategory={category}
            setReload={setReload}
            setShowModal={setShowModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Table;

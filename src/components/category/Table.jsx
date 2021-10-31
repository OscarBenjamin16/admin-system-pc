import React, { useState, lazy, Suspense } from "react";
import Modal from "../global/modal/Modal";
import TableLoading from "../global/TableLoading";
import THComponent from "../global/tables/THComponent";
import Form from "./Form";
const TableBody = lazy(() => import("./TableBody"));

const Table = ({ categories, setReload }) => {
  const [category, setCategory] = useState();
  const [showModal, setShowModal] = useState(false);

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
            <Suspense fallback={<TableLoading />}>
              <TableBody
                setCategory={setCategory}
                setShowModal={setShowModal}
                showModal={showModal}
                categories={categories}
                setReload={setReload}
              />
            </Suspense>
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

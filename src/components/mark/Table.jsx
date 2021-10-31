import React, { lazy, Suspense, useState } from "react";
import THComponent from "../global/tables/THComponent";
import Modal from "../global/modal/Modal";
import Form from "./Form";
import TableLoading from "../global/TableLoading";
const TableBody = lazy(() => import("./TableBody"));

const Table = (props) => {
  const { marks, setReload } = props;
  const [mark, setMark] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="ID" />
              <THComponent name="Nombre" />
              <THComponent name="Estado" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<TableLoading />}>
              <TableBody
                marks={marks}
                setMark={setMark}
                setReload={setReload}
                setShowModal={setShowModal}
                showModal={showModal}
              />
            </Suspense>
          </tbody>
        </table>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title="Editar Marca"
        >
          <Form
            oldMark={mark}
            setReload={setReload}
            setShowModal={setShowModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Table;

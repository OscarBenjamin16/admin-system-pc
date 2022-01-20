import React, { useState, Suspense, lazy } from "react";
import THComponent from "../global/tables/THComponent";
import Modal from "../global/modal/Modal";
import Form from "./Form";
import StockForm from "./StockForm";
import TableLoading from "../global/TableLoading";
const TableBody = lazy(() => import("./TableBody"));

const Table = (props) => {
  const { products, setReload,setState, marks, providers, categories } = props;
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [showAddStock, setShowAddStock] = useState(false);
  const [productStock, setProductStock] = useState();

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="ID" />
              <THComponent name="Nombre" />
              <THComponent name="Codigo" />
              <THComponent name="Imagen" />
              <THComponent name="Stock" />
              <THComponent name="Estado" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<TableLoading />}>
              <TableBody
                products={products}
                setProduct={setProduct}
                setProductStock={setProductStock}
                setShowModal={setShowModal}
                setReload={setReload}
                setShowAddStock={setShowAddStock}
              />
            </Suspense>
          </tbody>
        </table>
        {/* DetailModal */}
        {/* Edit Modal */}
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          title="Actualizar producto"
        >
          <Form
            setReload={setReload}
            oldProduct={product}
            setShowModal={setShowModal}
            marks={marks}
            categories={categories}
            providers={providers}
            textButton="Actualizar"
          />
        </Modal>
        {/* Add to stock Modal*/}
        <Modal
          title="Agregar stock"
          showModal={showAddStock}
          setShowModal={setShowAddStock}
        >
          <StockForm
          setState={setState}
            setReload={setReload}
            setShowModal={setShowAddStock}
            idP={productStock?.id}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Table;

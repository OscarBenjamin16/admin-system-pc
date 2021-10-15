import React, { useState } from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import Modal from "../global/modal/Modal";
import Form from "./Form";
import { ProductService } from "../../services/product.service";
import Detail from "./Detail";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import DeleteAction from "../global/DeleteAction";
import useAuth from "../../hooks/useAuth";
import StockForm from "./StockForm";

const Table = (props) => {
  const { products, setReload, marks, providers, categories } = props;
  const [showModal, setShowModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [product, setProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [productStock, setProductStock] = useState();
  const productService = new ProductService();
  const { auth } = useAuth();
  const change = (product) => {
    const query = {
      id: product.id,
    };
    if (product.catidad_por_unidad >= 2) {
      productService.changeStatus(query).then((res) => {
        if (res.ok) {
          setReload(true);
          return;
        }
        toast.error(res.message);
        return;
      });
    } else {
      toast.warning(
        "No puedes cambiar de estado!!!  no hay productos en inventario"
      );
    }
  };

  const detail = (product) => {
    setProductDetail(product);
    setShowDetail(true);
  };
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
            {products && products?.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <TDComponent
                    name={product.id}
                    onclick={() => detail(product)}
                    cursor="cursor-pointer"
                  />
                  <TDComponent
                    name={product.nombreProducto}
                    onclick={() => detail(product)}
                    cursor="cursor-pointer"
                  />
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
                          onChange={() => change(product)}
                          value={product.status}
                        />
                        <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                        <div
                          className={
                            "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                            (product.status &&
                              "toggle__dot_active bg-green-400")
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
              <p className="p-5">No hay registros</p>
            )}
          </tbody>
        </table>
        {/* DetailModal */}
        <Modal
          showModal={showDetail}
          setShowModal={setShowDetail}
          title={productDetail?.nombreProducto}
        >
          <Detail
            product={productDetail}
            setShowModal={setShowModal}
            showModal={showModal}
            setShowDetail={setShowDetail}
          />
        </Modal>
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
          <StockForm setReload={setReload} setShowModal={setShowAddStock} idP={productStock?.id} />
        </Modal>
      </div>
    </div>
  );
};

export default Table;

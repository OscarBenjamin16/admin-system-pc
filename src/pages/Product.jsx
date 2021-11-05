/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Modal from "../components/global/modal/Modal";
import Form from "../components/product/Form";
import { MarkService } from "../services/mark.service";
import { CategoryService } from "../services/category.service";
import { ProviderService } from "../services/provider.service";
import { ProductService } from "../services/product.service";
import Table from "../components/product/Table";
import Pagination from "../components/global/Pagination";
import { toast } from "react-toastify";
import InputSearch from "../components/global/InputSearch";

const Product = ({ showModal, setShowModal }) => {
  const [marks, setMarks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [state, setState] = useState(true);
  const [reload, setReload] = useState(false);
  const [providers, setProviders] = useState(null);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const markService = new MarkService();
  const categoryService = new CategoryService();
  const providerService = new ProviderService();
  const productService = new ProductService();
  const getValues = () => {
    markService
      .getMarks()
      .then((res) => {
        if (res.ok) {
          setMarks(res.marca);
          return;
        }
        toast.warning("No hay marcas disponibles");
      })
      .catch(() => {
        toast.error("Ah sucedido un error inesperado");
      });
    categoryService
      .getCategories()
      .then((res) => {
        if (res.ok) {
          setCategories(res.categoria);
          return;
        }
        toast.warning("No hay categorias disponibles");
      })
      .catch(() => {
        toast.error("Ah sucedido un error inesperado");
      });
    providerService
      .getProviders()
      .then((res) => {
        if (res.ok) {
          setProviders(res.proveedor);
          return;
        }
        toast.warning("No hay proveedores disponibles");
      })
      .catch(() => {
        toast.error("Ah sucedido un error inesperado");
      });
  };
  const getProducts = (page = 1, search = "") => {
    productService.showProducts(page, search, 5, state ? 1 : 0).then((res) => {
      console.log(res);
      setProducts(res.producto);
      setPagination({
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
    });
  };
  useEffect(() => {
    getValues();
    setReload(false);
    getProducts(page, search,5,state);
    return;
  }, [reload, page, search,state]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Productos
            </h2>
            <div style={{ width: "70%" }} className="mt-4">
              <InputSearch
                label="Buscar por nombre"
                placeholder="Escribe para buscar un producto..."
                handleChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Mostrar</label>
              <div className="text-xl font-semibold flex mt-1">
                <div className="relative mt-1 ml-3 inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    checked={state}
                    onClick={() => setState(!state)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="toggle"
                    className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <span className="text-sm font-normal text-gray-600 mt-1">
                  {state ? "Activos" : "Inactivos"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-global p-2 w-28 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-14"
            >
              Agregar
            </button>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              title="Agregar Producto"
            >
              <Form
                setShowModal={setShowModal}
                marks={marks}
                categories={categories}
                providers={providers}
                setReload={setReload}
                textButton="Agregar"
              />
            </Modal>
          </div>
          <Table
            setShowModal={setShowModal}
            showModal={showModal}
            setReload={setReload}
            products={products}
            marks={marks}
            categories={categories}
            providers={providers}
          />
          {pagination.totalPages > 1 && (
            <Pagination
              method={setPage}
              current={pagination?.currentPage}
              totalPages={pagination?.totalPages}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, lazy, Suspense } from "react";
import Layout from "../layout/Layout";
import { CategoryService } from "../services/category.service";
import Modal from "../components/global/modal/Modal";
import Form from "../components/category/Form";
import { toast } from "react-toastify";
import InputSearch from "../components/global/InputSearch";
import Waiting from "../components/global/Waiting";
import Pagination from "../components/global/Pagination";
const Table = lazy(() => import("../components/category/Table"));

const Category = ({ showModal, setShowModal }) => {
  const categoryService = new CategoryService();
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState();
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    prevPage: 0,
    nextPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const getCategories = (page = 1, search = "") => {
    categoryService
      .showCategories(page, search)
      .then((res) => {
        setCategories(res.categorias);
        setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
      })
      .catch(() => {
        toast.error("Ah ocurrido un error inesperado");
      });
  };
  useEffect(() => {
    getCategories(page, search);
    setReload(false);
    return;
  }, [reload, search, page]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de categorias
            </h2>
            <div style={{ width: "70%" }} className="mt-4">
              <InputSearch
                label="Buscar por nombre"
                placeholder="Escribe para buscar una categoria..."
                handleChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowModal(!showModal)}
              className="bg-global p-2 w-28 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-8"
            >
              Agregar
            </button>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              title="Agregar Categoria"
            >
              <Form setShowModal={setShowModal} setReload={setReload} />
            </Modal>
          </div>
          <Suspense fallback={<Waiting />}>
            <Table categories={categories} setReload={setReload} />
          </Suspense>
          {pagination?.totalPages > 1 && (
            <Pagination method={setPage}  current={pagination?.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Category;

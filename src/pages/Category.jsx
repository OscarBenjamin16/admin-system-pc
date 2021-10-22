/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Table from "../components/category/Table";
import { CategoryService } from "../services/category.service";
import Modal from "../components/global/modal/Modal";
import Form from "../components/category/Form";
import Pagination from "../components/global/Pagination";
import { toast } from "react-toastify";
import InputSearch from "../components/global/InputSearch";

const Category = ({ showModal, setShowModal }) => {
  const categoryService = new CategoryService();
  const [categories, setCategories] = useState();
  const [rangePag, setRangePag] = useState(null);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    prevPage: 0,
    nextPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const range = (start, end, length = end - start + 1) => {
    setRangePag(Array.from({ length }, (_, i) => start + i));
  };
  const getCategories = (page = 1, search = "") => {
    categoryService.showCategories(page, search)
      .then((res) => {
        setCategories(res.categorias);
        setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
        range(1, res.totalPages);
      })
      .catch(() => {
        toast.error("Ah ocurrido un error inesperado")
      });
  };
  useEffect(() => {
    getCategories(1, search);
    setReload(false);
    return;
  }, [reload || search]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de categorias
            </h2>
            <div style={{width:"70%"}} className="mt-4">
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
          <Table categories={categories} setReload={setReload} />
          {pagination?.totalPages > 1 && (
            <Pagination
              method={getCategories}
              pagination={pagination}
              rangePag={rangePag}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Category;

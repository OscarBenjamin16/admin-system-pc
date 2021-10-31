/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Suspense, lazy } from "react";
import { toast } from "react-toastify";
import InputSearch from "../components/global/InputSearch";
import Modal from "../components/global/modal/Modal";
import Pagination from "../components/global/Pagination";
import Waiting from "../components/global/Waiting";

import Form from "../components/mark/Form";
import Layout from "../layout/Layout";
import { MarkService } from "../services/mark.service";
const Table = lazy(() => import("../components/mark/Table"));

const Mark = ({ showModal, setShowModal }) => {
  const mark_service = new MarkService();
  const [marks, setMarks] = useState(null);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const getMarks = (page = 1, search = "") => {
    mark_service
      .showMarks(page, search)
      .then((res) => {
        setMarks(res.marcas);
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
    setReload(false);
    return getMarks(page, search);
  }, [reload, search, page]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Marcas
            </h2>
            <div style={{ width: "70%" }} className="mt-4">
              <InputSearch
                label="Buscar por nombre"
                placeholder="Escribe para buscar una marca..."
                handleChange={(e) => setSearch(e.target.value)}
              />
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
              title="Agregar Marca"
            >
              <Form setReload={setReload} setShowModal={setShowModal} />
            </Modal>
          </div>
          <Suspense fallback={<Waiting />}>
            <Table marks={marks} setReload={setReload} />
          </Suspense>
          {pagination?.totalPages > 1 && (
            <Pagination totalPages={pagination?.totalPages} current={pagination?.currentPage} method={setPage} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Mark;

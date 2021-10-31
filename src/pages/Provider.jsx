/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "../components/global/modal/Modal";
import Form from "../components/provider/Form";
import Table from "../components/provider/Table";
import Layout from "../layout/Layout";
import { ProviderService } from "../services/provider.service";
import Pagination from "../components/global/Pagination";
import InputSearch from "../components/global/InputSearch";

const Provider = ({ setShowModal, showModal }) => {
  const [providers, setProviders] = useState(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);

  const providerService = new ProviderService();
  const getProviders = (page = 1, search = "") => {
    providerService.showProviders(page, search).then((res) => {
      setProviders(res.proveedores);
      setPagination({
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
    });
  };
  useEffect(() => {
    getProviders(page, search);
    setReload(false);
    return;
  }, [reload, page, search]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Proveedores
            </h2>
            <div style={{ width: "70%" }} className="mt-4">
              <InputSearch
                label="Buscar por nombre"
                placeholder="Escribe para buscar un proveedor..."
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
              title="Agregar Proveedor"
            >
              <Form setReload={setReload} setShowModal={setShowModal} />
            </Modal>
          </div>
          <Table setReload={setReload} providers={providers} />
          {pagination && pagination?.totalPages > 1 && (
            <Pagination
              method={setPage}
              current={pagination?.currentPage}
              totalPages={pagination?.currentPage}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Provider;

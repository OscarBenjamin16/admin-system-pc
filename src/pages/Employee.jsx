import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { EmployeeService } from "../services/employe.service";
import Table from "../components/employee/Table";
import Modal from "../components/global/modal/Modal";
import Form from "../components/employee/Form";
import useAuth from "../hooks/useAuth";
import Pagination from "../components/global/Pagination";

const Employee = ({ showModal, setShowModal }) => {
  const [employees, setEmployees] = useState();
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const { auth } = useAuth();
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const empService = new EmployeeService();
  const getEmployes = (page = 1) => {
    empService.getPaginatedUser(page).then((res) => {
      if (res.ok) {
        setEmployees(res.empleados);
        setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
      }
    });
  };
  useEffect(() => {
    return getEmployes(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, page]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div>
          <span className="text-2xl font-semibold leading-tight">
            Listado de Empleados
          </span>
          {auth.role === "admin" && (
            <button
              className="bg-global p-2 px-4 mt-2 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-8"
              onClick={() => setShowModal(true)}
            >
              Agregar Empleado
            </button>
          )}
          <Modal
            showModal={showModal}
            title="Agregar empleado"
            setShowModal={setShowModal}
          >
            <Form setReload={setReload} setShowModal={setShowModal} />
          </Modal>
        </div>
        <div className="py-8">
          <Table employees={employees} />
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

export default Employee;

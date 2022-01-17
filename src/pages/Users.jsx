import { useEffect, useState } from "react";
import Table from "../components/clients/Table";
import Pagination from "../components/global/Pagination";
import Layout from "../layout/Layout";
import { UsersService } from "../services/users.service";

const Users = ({ showModal, setShowModal }) => {
  const [users, setUsers] = useState();
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const [rangePag, setRangePag] = useState(null);
  const range = (start, end, length = end - start + 1) => {
    setRangePag(Array.from({ length }, (_, i) => start + i));
  };
  const usService = new UsersService();
  const getUsers = (page = 1) => {
    usService.getUsers(page).then((res) => {
      setUsers(res.OrdenesCliente);
      setPagination({
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
      range(1, res.totalPages);
    });
  };
  useEffect(() => {
    return getUsers(pagination.currentPage || pagination.nextPage || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <span className="text-3xl font-light">Listado de clientes</span>
          <Table
            showModal={showModal}
            setShowModal={setShowModal}
            users={users}
          />
          {pagination.totalPages && pagination.totalPages > 1 && (
            <Pagination
              method={getUsers}
              pagination={pagination}
              rangePag={rangePag}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Users;

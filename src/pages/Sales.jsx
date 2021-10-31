import { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "../layout/Layout";
import { OrderService } from "../services/order.service";
import { Table } from "../components/sales/Table";
import io from "socket.io-client";
import Pagination from "../components/global/Pagination";
import { toast } from "react-toastify";
import { SOCKET_URL } from "../utils/constant";
import InputSearch from "../components/global/InputSearch";
import { Link } from "react-router-dom";

const Sales = () => {
  const [orders, setOrders] = useState();
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const [reloadSocket, setReloadSocket] = useState(false);
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });

  const orderService = new OrderService();
  const serverURL = SOCKET_URL;
  const socket = useMemo(
    () =>
      io.connect(serverURL, {
        transports: ["websocket"],
      }),
    [serverURL]
  );
  useEffect(() => {
    socket.on("connect", () => {});
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {});
  }, [socket]);

  const callSocket = useCallback(() => {
    socket.on("reload", () => {
      toast.success("Se registro una nueva orden");
      setReloadSocket(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    return callSocket();
  }, [callSocket]);

  const getOrders = useCallback((page = 1, search) => {
    orderService.getOrders(page, search).then((res) => {
      if (res.ok) {
        setOrders(res.ordenes);
        setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
      }
    });
    setReload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReloadSocket(false);
    getOrders(page);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadSocket, page]);

  useEffect(() => {
    return getOrders(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, search, page]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Ventas y Ordenes
            </h2>
            <div style={{ width: "70%" }} className="mt-4">
              <InputSearch
                label="Buscar por codigo de orden"
                placeholder="Escribe el codigo de orden para buscar..."
                handleChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link to="/new-sale">
              <button className="bg-global p-2 w-28 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-14">
                Agregar
              </button>
            </Link>
            <Table orders={orders} setReload={setReload} />
            {pagination && pagination?.totalPages > 1 && (
              <Pagination
                method={setPage}
                totalPages={pagination?.totalPages}
                current={pagination?.currentPage}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;

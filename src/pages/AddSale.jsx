import React, { useState, useEffect } from "react";
import InputSearch from "../components/global/InputSearch";
import CartButton from "../components/product/NewSale/CartButton";
import ListProducts from "../components/product/NewSale/ListProducts";
import Layout from "../layout/Layout";
import { ProductService } from "../services/product.service";
import Pagination from "../components/global/Pagination";

export default function AddSale() {
  const [products, setProducts] = useState(null);
  const [loadCart, setLoadCart] = useState(false);
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const productService = new ProductService();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const getProducts = (page = 1, search = "") => {
    productService.showProducts(page, search).then((res) => {
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
    return getProducts(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Selecciona los productos a vender
            </h2>
            <div style={{ width: "70%" }} className="mt-4">
              <InputSearch
                label="Buscar por nombre"
                placeholder="Escribe para buscar un producto..."
                handleChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <CartButton loadCart={loadCart} setLoadCart={setLoadCart} />
          </div>
          <div className="grid w-full mt-5 grid-cols-1 md:grid-rows-1 lg:grid-cols-2 xl:grid-cols-4 justify-center items-center gap-3">
            <ListProducts
              setLoadCart={setLoadCart}
              products={products && products}
            />
          </div>
          <Pagination
            method={setPage}
            totalPages={pagination?.totalPages}
            current={pagination?.currentPage}
          />
        </div>
      </div>
    </Layout>
  );
}

import React, { lazy, Suspense } from "react";
import TableLoading from "../global/TableLoading";
import THComponent from "../global/tables/THComponent";
const TableBody = lazy(() => import("./TableBody"));

const Table = ({ coupons, setReload }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="Codigo" />
              <THComponent name="Descuento" />
              <THComponent name="Fecha de expiracion" />
              <THComponent name="Estado" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<TableLoading />}>
              <TableBody coupons={coupons} setReload={setReload} />
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

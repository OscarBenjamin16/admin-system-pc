import React from "react";
import Warn from "../../assets/warn.svg";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import DeleteAction from "../global/DeleteAction";
import useAuth from "../../hooks/useAuth";
import TDComponent from "../global/tables/TDComponent";

export default function TableBody({ setReload, coupons }) {
  const ctx = useAuth();
  const { auth } = ctx;
  const deleteCoupon = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteAction
            id={id}
            type="coupon"
            onClose={onClose}
            setReload={setReload}
          />
        );
      },
    });
  };
  return (
    <>
      {typeof coupons === "undefined" && (
        <p className="p-5 text-xs font-semibold text-gray-600">
          No hay registros para mostrar
        </p>
      )}
      {coupons &&
        coupons.map((cp, _) => (
          <tr key={cp.id}>
            <TDComponent name={cp.codigo} />
            <TDComponent name={`${Number(cp.descuento)}%`} />
            <TDComponent>
              {new Date(cp.fechaExp) < Date.now() && (
                <img src={Warn} alt="none" className="w-6" />
              )}
              <span className="mt-1 ml-2">
                {moment(cp.fechaExp).calendar()}
              </span>
            </TDComponent>
            <TDComponent>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    readOnly
                    checked={cp.status === 1 ? true : false}
                    className="hidden"
                    value={cp.status}
                  />
                  <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                  <div
                    className={
                      "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                      (cp.status && "toggle__dot_active bg-green-400")
                    }
                  ></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                  {cp.status ? "Activo" : "Inactivo"}
                </div>
              </label>
            </TDComponent>
            <TDComponent>
              {auth.role === "admin" && (
                <button
                  onClick={() => deleteCoupon(cp.id)}
                  className="bg-red-400 p-2 text-xs w-20 rounded text-white font-semibold"
                >
                  Eliminar
                </button>
              )}
            </TDComponent>
          </tr>
        ))}
    </>
  );
}

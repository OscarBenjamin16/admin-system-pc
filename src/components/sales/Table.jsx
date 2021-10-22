import { memo, useCallback } from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import moment from "moment";
import "moment/locale/es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { OrderService } from "../../services/order.service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const Table = memo(({ orders, setReload }) => {
  const ordService = new OrderService();
  const changeStatus = useCallback((id) => {
    ordService.changeStatus(id).then((res) => {
      if (res.ok) {
        setReload(true);
        return;
      }
      toast.error("Ah ocurrido un error inesperado");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="ID" />
              <THComponent name="Fecha de la orden" />
              <THComponent name="Cliente" />
              <THComponent name="Codigo" />
              <THComponent name="Descuento" />
              <THComponent name="Total a pagar" />
              <THComponent name="Estado de la orden" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <TDComponent>
                    <Link to={"/sale/" + order.id}>{order.id}</Link>
                  </TDComponent>
                  <TDComponent>
                    <Link to={"/sale/" + order.id}>
                      {moment(order.fecha_Orden).calendar()}
                    </Link>
                  </TDComponent>
                  <TDComponent
                    name={order.cliente.nombre + " " + order.cliente.apellido}
                  />
                  <TDComponent
                    name={order.codigoOrden}
                  />
                  <TDComponent name={"$" + order.TotalDesc} />
                  <TDComponent name={"$" + order.PrecioTotal} />
                  <TDComponent>
                    {(order.status === 1 && (
                      <div>
                        <FontAwesomeIcon
                          className="text-green-500"
                          icon={faCheck}
                        />
                        <span className="ml-2">Completada</span>
                      </div>
                    )) ||
                      (order.status === 0 && (
                        <div>
                          <FontAwesomeIcon
                            className="text-gray-500"
                            icon={faClock}
                          />
                          <span className="ml-2">Pendiente</span>
                        </div>
                      )) ||
                      (order.status === 2 && (
                        <div>
                          <FontAwesomeIcon
                            className="text-blue-500"
                            icon={faPaypal}
                          />
                          <span className="ml-2">Completada</span>
                        </div>
                      ))}
                  </TDComponent>
                  <TDComponent>
                    {order.status === 0 && (
                      <button
                        onClick={() => changeStatus(order.id)}
                        className="bg-blue-500 rounded px-4 text-white"
                      >
                        Completar
                      </button>
                    )}
                  </TDComponent>
                </tr>
              ))
            ) : (
              <p className="p-5">No hay registros para mostrar</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

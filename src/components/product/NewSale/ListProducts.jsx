import React, { useEffect, useState } from "react";
import { setItemCart } from "../../../utils/cart";

export default function ListProducts({ products, setLoadCart }) {
  const [prod, setProd] = useState();
  useEffect(() => {
    if (prod) {
      const desc = (Number(prod.costo_standar) * Number(prod.descuento)) / 100;
      let values = {
        id: prod?.id,
        qt: 1,
        price: Number(prod?.costo_standar) - desc,
        original_price: Number(prod?.price),
        img: prod?.image,
        name: prod?.nombreProducto,
      };
      setItemCart(values);
      setProd(undefined);
      setLoadCart(true);
    }
    return;
  }, [prod, setLoadCart]);
  return (
    <>
      {products &&
        products?.map((prod) => (
          <div key={prod?.id} className="border rounded shadow p-4">
            <div className="flex">
              <div className="w-20 max-h-20 border p-3">
                <img src={prod?.image} className="max-h-16" alt="null" />
              </div>
              <span className="bg-green-500 ml-16 text-xs font-semibold text-white w-12 flex justify-items-center justify-center content-center items-center rounded-full h-12">
                ${prod?.costo_standar}
              </span>
            </div>
            <div className="pt-4 font-semibold text-sm">
              Producto: {prod?.nombreProducto}
            </div>
            <div className="mt-1 font-semibold text-sm">
              Stock: {prod?.catidad_por_unidad}
            </div>
            <div className="mt-1 font-semibold text-sm">
              Descuento: {prod?.descuento}
            </div>
            <div className="mt-1 font-semibold text-sm">
              Marca: {prod?.marca?.marca}
            </div>
            <div className="mt-1 font-semibold text-sm">
              Proveedor: {prod?.proveedor?.nombre_proveedor}
            </div>
            <div className="mt-1 font-semibold text-sm">
              Codigo: {prod?.codigo_Producto}
            </div>
            <button
              onClick={() => setProd(prod)}
              className="w-full text-white bg-blue-500 rounded text-xs py-1  mt-2 font-semibold"
            >
              Agregar
            </button>
          </div>
        ))}
    </>
  );
}

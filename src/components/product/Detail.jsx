import React from "react";
import Barcode from "react-barcode";

const Detail = ({ product }) => {
  return (
    <div className="w-full grid grid-cols-2">
      <div className="w-96">
        <p>
          <span className="uppercase text-sm font-mono font-semibold">Nombre:</span>{" "}
          {product?.nombreProducto}
        </p>
        <p className="mt-2">
          <span className="uppercase text-sm font-mono font-semibold">Marca:</span>{" "}
          {product?.marca.marca}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Proveedor:</span>{" "}
          {product?.proveedor.nombre_proveedor}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Categoria:</span>{" "}
          {product?.categoria.categoria}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Precio:</span>{" "}
          {product?.costo_standar}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Descuento:</span>{" "}
          {product?.descuento}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Stock:</span>{" "}
          {product?.catidad_por_unidad}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Estado:</span>{" "}
          {product?.status ? "Activo" : "Inactivo"}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Descripcion:</span>{" "}
          {product?.descripcion}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Codigo:</span>{" "}
        </p>
        <div className="">
          <Barcode
            width={1}
            fontSize={13}
            height={65}
            value={product?.codigo_Producto}
          />
        </div>
      </div>
      <div className="w-96">
        <img src={product?.image} alt="none" className="w-60" />
      </div>
    </div>
  );
};

export default Detail;

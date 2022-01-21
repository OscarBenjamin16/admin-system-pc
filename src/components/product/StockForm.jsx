import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductService } from "../../services/product.service";
import { toast } from "react-toastify";

const StockForm = ({ idP, setShowModal, setReload, setState }) => {
  const prdService = new ProductService();
  const formik = useFormik({
    initialValues: defaultValues(),
    validationSchema: Yup.object({
      cantidadProducto: Yup.number()
        .required("El stock del producto es requerido")
        .typeError("Stock invalido"),
      precioCompra: Yup.number()
        .required("El precio de compra es requerido")
        .typeError("Precio invalido"),
      costo_standar: Yup.number()
        .required("El precio de venta es requerido")
        .typeError("El precio de venta es invalida"),
    }),
    onSubmit: (values) => {
      prdService.addStockProduct(idP, values).then((res) => {
        if (res.ok) {
          setShowModal(false);
          setState(true);
          toast.success("Se actualizo el stock del producto");
          setReload(true);
          return;
        }
        toast.error("Ocurrio un error al actualizar el stock");
      });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm font-mono text-gray-400">Stock</label>
          <input
            type="text"
            name="cantidadProducto"
            onChange={formik.handleChange}
            placeholder="Ingresa el stock del producto"
            className={
              "w-80 border p-1 font-mono px-2 text-sm rounded " +
              (formik.errors.cantidadProducto && formik.touched.cantidadProducto
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.cantidadProducto &&
            formik.touched.cantidadProducto && (
              <span className="font-small font-normal text-red-400">
                {formik.errors.cantidadProducto}
              </span>
            )}
        </div>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm font-mono text-gray-400">
            Precio de compra
          </label>
          <input
            type="text"
            name="precioCompra"
            onChange={formik.handleChange}
            placeholder="Ingresa el precio de compra del producto"
            className={
              "w-80 border p-1 font-mono px-2 text-sm rounded " +
              (formik.errors.precioCompra && formik.touched.precioCompra
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.precioCompra && formik.touched.precioCompra && (
            <span className="font-small font-normal text-red-400">
              {formik.errors.precioCompra}
            </span>
          )}
        </div>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm font-mono text-gray-400">
            Precio de venta
          </label>
          <div className="flex">
            <input
              type="text"
              name="costo_standar"
              onChange={formik.handleChange}
              placeholder="Ingresa el precio de venta del producto"
              className={
                "border p-1 px-2 text-sm font-mono rounded border-r-0 focus:outline-none focus:border w-full " +
                (formik.errors.costo_standar && formik.touched.costo_standar
                  ? "border-red-400"
                  : "border-gray-300")
              }
            />
          </div>
          {formik.errors.costo_standar && formik.touched.costo_standar && (
            <span className="font-small font-normal text-red-400">
              {formik.errors.costo_standar}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-global font-mono mt-4 text-white w-full rounded px-12 py-1 text-sm"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default StockForm;
function defaultValues() {
  return {
    cantidadProducto: "",
    precioCompra: "",
    costo_standar: "",
  };
}

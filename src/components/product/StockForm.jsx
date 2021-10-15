import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductService } from "../../services/product.service";
import { toast } from "react-toastify";

const StockForm = ({ idP,setShowModal,setReload }) => {
    const prdService = new ProductService()
  const formik = useFormik({
    initialValues: defaultValues(),
    validationSchema: Yup.object({
      cantidadProducto: Yup.number()
        .required("El stock del producto es requerido")
        .typeError("Stock invalido"),
      precioCompra: Yup.number()
        .required("El precio de compra es requerido")
        .typeError("Precio invalido"),
      beneficio: Yup.number()
        .required("La ganancia es requerida")
        .typeError("La ganancia es invalida"),
    }),
    onSubmit: (values) => {
      prdService.addStockProduct(idP,values).then(res=>{
          if(res.ok){
            setShowModal(false)
            toast.success("Se actualizo el stock del producto")
            setReload(true)
            return;
          }
          toast.error("Ocurrio un error al actualizar el stock")
      })
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm text-gray-400">Stock</label>
          <input
            type="text"
            name="cantidadProducto"
            onChange={formik.handleChange}
            placeholder="Ingresa el stock del producto"
            className={
              "w-80 border p-1 px-2 text-sm rounded " +
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
          <label className="text-sm text-gray-400">Precio de compra</label>
          <input
            type="text"
            name="precioCompra"
            onChange={formik.handleChange}
            placeholder="Ingresa el precio de compra del producto"
            className={
              "w-80 border p-1 px-2 text-sm rounded " +
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
          <label className="text-sm text-gray-400">Ganancia de venta</label>
          <div className="flex">
          <input
            type="text"
            name="beneficio"
            onChange={formik.handleChange}
            placeholder="Ingresa la ganancia del producto"
            className={
              "border p-1 px-2 text-sm rounded border-r-0 focus:outline-none focus:border w-full " +
              (formik.errors.beneficio && formik.touched.beneficio
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          <span className="border px-4 py-1 text-sm rounded absolute mr-6 bg-gray-300 font-bold right-0">
              %
            </span>
          </div>
          {formik.errors.beneficio && formik.touched.beneficio && (
            <span className="font-small font-normal text-red-400">
              {formik.errors.beneficio}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-global mt-4 text-white w-full rounded px-12 py-1 text-sm"
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
    beneficio: "",
  };
}

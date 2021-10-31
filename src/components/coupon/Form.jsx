import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CouponService } from "../../services/coupon.service";

const Form = ({setShowModal,setReload}) => {
  const coupService = new CouponService();
  const formik = useFormik({
    initialValues: defaultValues(),
    validationSchema: Yup.object({
      descuento: Yup.number()
        .required("El descuento es requerido")
        .typeError("Este no es descuento valido")
        .min(1, "Descuento invalido")
        .max(99, "Superaste el limite de descuento"),
      fechaExp: Yup.date()
        .required("Este campo es requerido")
        .typeError("No es una fecha valida"),
    }),
    onSubmit: (values) => {
      coupService.addCoupon(values).then((res) => {
        setReload(true)
        setShowModal(false)
      });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-600 text-xs font-semibold">Descuento</label>
          <div className="flex">
            <input
              name="descuento"
              onChange={formik.handleChange}
              placeholder="Ingresa el descuento del cupon"
              className={
                "w-80 border p-1 px-4 text-xs font-semibold mt-1 rounded border-r-0 focus:outline-none focus:border " +
                (formik.errors.descuento && formik.touched.descuento
                  ? " border-red-400"
                  : " border-gray-400")
              }
            />
            <span className="border px-4 py-1 mt-1 text-xs font-semibold rounded absolute mr-6 bg-gray-300 right-0">
              %
            </span>
          </div>
          {formik.errors.descuento && (
            <span className="text-red-400  text-xs font-semibold mt-1">
              {formik.errors.descuento}
            </span>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label className="text-gray-600 text-xs font-semibold">Fecha de expiracion</label>
          <input
            type="date"
            name="fechaExp"
            onChange={formik.handleChange}
            placeholder="Ingresa el descuento del cupon"
            className={
              "w-80 border p-1 px-4 text-xs font-semibold rounded mt-1 focus:outline-none focus:border " +
              (formik.errors.fechaExp && formik.touched.fechaExp
                ? " border-red-400"
                : " border-gray-400")
            }
          />
          {formik.errors.fechaExp && (
            <span className="text-red-400 text-xs font-semibold mt-1">
              {formik.errors.fechaExp}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="mt-3 w-full bg-global py-1 text-sm text-white rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Form;
function defaultValues() {
  return {
    descuento: "",
    fechaExp: "",
  };
}

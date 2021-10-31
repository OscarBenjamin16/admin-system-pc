import React from "react";
import { MarkService } from "../../services/mark.service";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const Form = ({ setReload, setShowModal, oldMark }) => {
  const mark_services = new MarkService();

  const formik = useFormik({
    initialValues: { mark: "" || oldMark?.marca },
    validationSchema: yup.object({
      marca: yup.string().required("El nombre de la marca es requerido"),
    }),
    onSubmit: (values) => {
      if (oldMark) {
        mark_services.putMark(values, oldMark?.id).then((res) => {
          setShowModal(false);
          setReload(true);
          toast.success(res.messge);
        });
        return;
      }
      mark_services.addMark(values).then((res) => {
        setShowModal(false);
        setReload(true);
        toast.success(res.message);
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold text-xs">Nombre</label>
          <input
            className={
              "rounded border border-solid p-2 text-xs text-gray-600 font-semibold w-72 mt-2 " +
              (formik.errors.mark && formik.touched.mark
                ? " border-red-500"
                : "border-gray-400")
            }
            placeholder="nombre"
            defaultValue={oldMark?.marca}
            name="marca"
            onChange={formik.handleChange}
          />
          {formik.errors.mark && formik.touched.mark && (
            <span className="text-xs font-semibold text-red-500">
              {formik.errors.mark}
            </span>
          )}
        </div>
        <button
          disabled={formik.isSubmitting}
          className="bg-global p-2 w-full focus:outline-none text-center text-semibold mt-8 text-white rounded-md font-semibold text-xs mr-8"
        >
          {oldMark ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

export default Form;

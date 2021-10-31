import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { CategoryService } from "../../services/category.service";
import * as yup from "yup";

const Form = ({ setReload, setShowModal, oldCategory }) => {
  const categoryServices = new CategoryService();

  const formik = useFormik({
    initialValues: { categoria: "" || oldCategory?.categoria },
    validationSchema: yup.object({
      categoria: yup
        .string()
        .required("El nombre de la categoria es requerido"),
    }),
    onSubmit: (values) => {
      if (!oldCategory) {
        categoryServices.addCategory(values).then((resp) => {
          setShowModal(false);
          setReload(true);
          toast.success(resp.message);
        });
        return;
      }
      categoryServices.putCategory(values, oldCategory?.id).then((resp) => {
        setShowModal(false);
        setReload(true);
        toast.success("Se actualizo la categoria");
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-600">Nombre</label>
          <input
            className={
              "rounded border border-solid p-2 text-xs text-gray-600 font-semibold w-72 mt-2 " +
              (formik.errors.categoria && formik.touched.categoria
                ? " border-red-500"
                : "border-gray-400")
            }
            placeholder="Ingresa el nombre de la categoria"
            defaultValue={oldCategory?.categoria}
            name="categoria"
            onChange={formik.handleChange}
          />
          {formik.errors.categoria && formik.touched.categoria && (
            <span className="text-xs font-semibold text-red-500">
              {formik.errors.categoria}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-global p-2 w-full text-center text-semibold mt-8 text-white rounded-md font-semibold text-xs mr-8"
        >
          {oldCategory ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default Form;

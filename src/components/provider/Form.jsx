import React from "react";
import { ProviderService } from "../../services/provider.service";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const Form = ({ setReload, setShowModal, oldProvider }) => {
  const providerService = new ProviderService();
  const formik = useFormik({
    initialValues: {
      nombre: "" || oldProvider?.nombre,
      telefono: "" || oldProvider?.telefono,
      email: "" || oldProvider?.email,
      direccion: "" || oldProvider?.direccion,
    },
    validationSchema: yup.object({
      nombre: yup.string().required("Debes ingresar el nombre"),
      telefono: yup.string().required("Debes ingresar el numero de telefono"),
      email: yup
        .string()
        .email("Email incorrecto")
        .required("Debes ingresar el email"),
      direccion: yup.string().required("Debes escribir la direccion"),
    }),
    onSubmit: (values) => {
      if (!oldProvider) {
        providerService.addProvider(values).then((res) => {
          setShowModal(false);
          setReload(true);
          toast.success(res.message);
        });
        return;
      }
      providerService.putProvider(values, oldProvider?.id).then((res) => {
        setShowModal(false);
        setReload(true);
        toast.success(res.messge);
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="grid grid-rows-2 gap-0">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-600">
              Nombre
            </label>
            <input
              className={
                "rounded border border-solid p-2 text-xs text-gray-600 font-semibold w-80 mt-2 " +
                (formik.errors.nombre && formik.touched.nombre
                  ? " border-red-500"
                  : "border-gray-400")
              }
              placeholder="Escribe el nombre"
              defaultValue={oldProvider?.nombre}
              name="nombre"
              onChange={formik.handleChange}
            />
            {formik.errors.nombre && formik.touched.nombre && (
              <span className="text-xs font-semibold text-red-500">
                {formik.errors.nombre}
              </span>
            )}
          </div>

          <div className="flex flex-col mt-2">
            <label className="text-xs font-semibold text-gray-600">
              Telefono
            </label>
            <input
              className={
                "rounded border border-solid p-2 text-xs text-gray-600 font-semibold w-80 mt-2 " +
                (formik.errors.telefono && formik.touched.telefono
                  ? " border-red-500"
                  : "border-gray-400")
              }
              placeholder="Escribe el numero de telefono"
              defaultValue={oldProvider?.telefono}
              name="telefono"
              onChange={formik.handleChange}
            />
            {formik.errors.telefono && formik.touched.telefono && (
              <span className="text-xs font-semibold text-red-500">
                {formik.errors.telefono}
              </span>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-xs font-semibold text-gray-600">Email</label>
            <input
              className={
                "rounded border border-solid p-2 text-xs text-gray-600 font-semibold w-80 mt-2 " +
                (formik.errors.email && formik.touched.email
                  ? " border-red-500"
                  : "border-gray-400")
              }
              placeholder="Escribe el email"
              defaultValue={oldProvider?.email}
              name="email"
              type="email"
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-xs font-semibold text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-xs font-semibold text-gray-600">
              Direccion
            </label>
            <input
              className={
                "rounded border border-solid p-2 text-xs text-gray-600 font-semibold w-80 mt-2 " +
                (formik.errors.direccion && formik.touched.direccion
                  ? " border-red-500"
                  : "border-gray-400")
              }
              placeholder="Escribe la direccion"
              defaultValue={oldProvider?.direccion}
              name="direccion"
              onChange={formik.handleChange}
            />
            {formik.errors.direccion && formik.touched.direccion && (
              <span className="text-xs font-semibold text-red-500">
                {formik.errors.direccion}
              </span>
            )}
          </div>
        </div>
        <button className="bg-global p-2 w-full text-center text-semibold mt-8 text-white rounded-md font-semibold text-xs mr-8">
          {oldProvider ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
};

export default Form;

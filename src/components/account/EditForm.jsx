import { Formik, ErrorMessage, Form, Field } from "formik";
import { EmployeeService } from "../../services/employe.service";
import * as yup from "yup";
import { toast } from "react-toastify";

const EditForm = ({ empInfo, setReload, setShowModal }) => {
  const emplService = new EmployeeService();
  const submit = (values) => {
    emplService
      .edit(values, empInfo?.id)
      .then((res) => {
        if (res.ok) {
          toast.success(res.message);
          setReload(true);
          setShowModal(false);
        }
      })
      .catch(() => {
        toast.error("Ah ocurrido un error inesperado");
      });
  };
  return (
    <Formik
      initialValues={defaultValues(empInfo)}
      onSubmit={(fields) => submit(fields)}
      validationSchema={yup.object().shape({
        nombre: yup.string().required("El nombre es requerido"),
        apellido: yup.string().required("El apellido es requerido"),
        telefono: yup
          .string()
          .typeError("No es un numero de telefono valido")
          .required("El telefono es requerido")
          .matches(/^[0-9]+$/, "Esto no es numero de telefono")
          .min(8, "Numero de telefono invalido")
          .max(8, "numero de telefono invalido"),
        direccion: yup.string().required("La direccion es requerida"),
        email:yup.string().required("El email es requerido").email("Email invalido")
      })}
      validateOnChange={true}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="login-container grid w-80 p-2 mr-4">
            <div className="flex flex-col p-1 mt-1">
              <label className="text-xs text-gray-600 font-semibold">Nombre</label>
              <Field
                name="nombre"
                className={
                  "border-solid text-gray-600 border rounded px-4 outline-none focus:outline-none bg-transparent text-xs font-semibold p-1 " +
                  (errors.nombre && touched.nombre
                    ? " border-red-500"
                    : " border-gray-300")
                }
                placeholder="Ingresa tu nombre"
              />
              {errors.nombre && (
                <ErrorMessage
                  name="nombre"
                  component="span"
                  className="text-red-400 text-xs font-semibold"
                />
              )}
            </div>
            <div className="flex flex-col p-1 mt-1">
              <label className="text-xs text-gray-600 font-semibold">Apellido</label>
              <Field
                name="apellido"
                className={
                  "border-solid text-gray-600 border rounded px-4 outline-none focus:outline-none bg-transparent text-xs font-semibold p-1 " +
                  (errors.nombre && touched.nombre
                    ? " border-red-500"
                    : " border-gray-300")
                }
                placeholder="Ingresa tu nombre"
              />
              {errors.apellido && (
                <ErrorMessage
                  name="apellido"
                  component="span"
                  className="text-red-400 text-xs font-semibold"
                />
              )}
            </div>
            <div className="flex flex-col p-1 mt-1">
              <label className="text-xs text-gray-600 font-semibold">Telefono</label>
              <Field
                name="telefono"
                className={
                  "border-solid text-gray-600 border rounded px-4 outline-none focus:outline-none bg-transparent text-xs font-semibold p-1 " +
                  (errors.telefono && touched.telefono
                    ? " border-red-500"
                    : " border-gray-300")
                }
                placeholder="Ingresa tu numero de telefono"
              />
              {errors.telefono && (
                <ErrorMessage
                  name="telefono"
                  component="span"
                  className="text-red-400 text-xs font-semibold"
                />
              )}
            </div>
            <div className="flex flex-col p-1 mt-1">
              <label className="text-xs text-gray-600 font-semibold">Direccion</label>
              <Field
                name="direccion"
                className={
                  "border-solid text-gray-600 border rounded px-4 outline-none focus:outline-none bg-transparent text-xs font-semibold p-1 " +
                  (errors.direccion && touched.direccion
                    ? " border-red-500"
                    : " border-gray-300")
                }
                placeholder="Ingresa tu numero de telefono"
              />
              {errors.direccion && (
                <ErrorMessage
                  name="direccion"
                  component="span"
                  className="text-red-400 font-small"
                />
              )}
            </div>
            <div className="flex flex-col p-1 mt-1">
              <label className="text-xs text-gray-600 font-semibold">Email</label>
              <Field
                name="email"
                className={
                  "border-solid text-gray-600 border rounded px-4 outline-none focus:outline-none bg-transparent text-xs font-semibold p-1 " +
                  (errors.email && touched.email
                    ? " border-red-500"
                    : " border-gray-300")
                }
                placeholder="Ingresa tu numero de telefono"
              />
              {errors.email && (
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-400 text-xs font-semibold"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-global text-white rounded text-sm py-1 mt-4"
            >
              Guardar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;

function defaultValues(empInfo) {
  return {
    nombre: empInfo?.nombre,
    apellido: empInfo?.apellido,
    telefono: empInfo?.telefono,
    direccion: empInfo?.direccion,
    email:empInfo?.email
  };
}

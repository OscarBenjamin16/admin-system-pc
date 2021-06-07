import { useState, useRef } from "react";
import { useFormik } from "formik";
import { generateAdminCode } from "../../utils/regularExpression";
import * as Yup from "yup";
import { EmployeeService } from "../../services/employe.service";
import { toast } from "react-toastify";

const Form = ({setReload,setShowModal}) => {
    const empService = new EmployeeService()
  const inputCode = useRef();
  const [codeVal, setCodeVal] = useState({
    value: "",
    error: true,
    errorMessage: "",
  });
  const setCode = () => {
    let val = inputCode.current.value;
    val = generateAdminCode();
    setCodeVal({ value: val, error: false });
  };
  const formik = useFormik({
    initialValues: defaultValues(),
    validationSchema: Yup.object({
      nombre: Yup.string().required(),
      apellido: Yup.string().required(),
    }),
    onSubmit: (values) => {
      if (!codeVal.error) {
        const newValues = { ...values, code: codeVal.value };
        empService.addEmploye(newValues).then(res=>{
            if(res.ok){
                toast.success(res.msj)
                setReload(true)
                setShowModal(false)
                return
            }
            toast.error(res.msj)
        }).catch(()=>{
            console.log("error")
        })
      } else {
        setCodeVal({ ...codeVal, message: "Este campo es obligatorio" });
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm text-gray-400">Nombre</label>
          <input
            type="text"
            name="nombre"
            onChange={formik.handleChange}
            placeholder="Ingresa el nombre del empleado"
            className={
              "w-80 border p-1 text-sm rounded " +
              (formik.errors.nombre && formik.touched.nombre
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.nombre && formik.touched.nombre && (
            <span className="font-small font-normal text-red-400">
              El nombre es requerido
            </span>
          )}
        </div>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm text-gray-400">Apellido</label>
          <input
            type="text"
            name="apellido"
            onChange={formik.handleChange}
            placeholder="Ingresa el nombre del empleado"
            className={
              "w-80 border p-1 text-sm rounded " +
              (formik.errors.apellido && formik.touched.apellido
                ? "border-red-400"
                : "border-gray-300")
            }
          />
          {formik.errors.apellido && formik.touched.apellido && (
            <span className="font-small font-normal text-red-400">
              El apellido es requerido
            </span>
          )}
        </div>
        <div className="flex flex-col p-1 mt-1">
          <label className="text-sm text-gray-400">Codigo de acceso</label>
          <div className="flex mt-1">
            <button
              type="button"
              onClick={setCode}
              className="p-1 text-sm rounded px-4 bg-green-400 text-white"
            >
              Generar
            </button>
            <input
              ref={inputCode}
              disabled
              defaultValue={codeVal.value}
              placeholder="codigo de acceso"
              className={
                "border w-full outline-none focus:outline-none bg-transparent text-sm p-1 ml-2 rounded " +
                (codeVal.message !== "" ? "border-gray-300" : "border-red-400")
              }
            />
          </div>
          <span className="text-red-400 text-xs">
            {codeVal.message !== "" ? codeVal.message : ""}
          </span>
        </div>

        <button
          type="submit"
          className="bg-global mt-4 text-white rounded px-12 py-1 text-sm"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Form;
function defaultValues() {
  return {
    nombre: "",
    apellido: "",
  };
}

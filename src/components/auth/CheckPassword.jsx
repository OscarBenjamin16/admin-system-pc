import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as yup from "yup";
import { EmployeeService } from "../../services/employe.service";
import { toast } from "react-toastify";

const CheckPassword = (props) => {
  const { code, existUser, setRefreshCheckLogin, setShow } = props;
  const emplService = new EmployeeService();
  const login = (values) => {
    const data = {
      code,
      password: values.password,
    };
    emplService.login(data).then((res) => {
      if (res.token) {
        setRefreshCheckLogin(true);
        emplService.setToken(res.token);
        toast.success("Los datos con correctos!!");
        return;
      }
      if (!res.ok) {
        toast.error("Los datos ingresados son invalidos!");
        return;
      }
    });
  };
  const addNewPassword = (values) => {
    emplService.addPass(existUser.id, values.password).then((res) => {
      if (res.ok) {
        toast.success("Tu contraseña se guardo con exito");
        login(values);
      }
    });
  };
  return (
    <>
      {existUser.newUser ? (
        <Formik
          initialValues={{ password: "", repeatPassword: "" }}
          onSubmit={(values) => addNewPassword(values)}
          validationSchema={yup.object().shape({
            password: yup.string().required("La contreseña es requerida"),
            repeatPassword: yup
              .string()
              .required("Es necesario que confirmes tu contreseña")
              .oneOf(
                [yup.ref("password"), null],
                "Las contraseñas deben ser iguales"
              ),
          })}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="login-container grid w-80 px-8 mr-4 ml-5 md:ml-0">
                <h1 className="text-gray-600 text-sm md:text-md py-4 font-semibold uppercase text-center md:ml-6">
                  Configura tu password
                </h1>
                <div className="flex flex-col justify-center content-center">
                  <label className="text-xs text-gray-500 font-semibold">
                    Contraseña
                  </label>
                  <Field
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    className={
                      "text-gray-500 border rounded outline-none focus:outline-none px-4 text-xs py-1 mt-2" +
                      (errors.password && touched.password
                        ? " border-red-500"
                        : " border-gray-300")
                    }
                  />
                  {errors.password && (
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-400 font-small"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center content-center mt-2 ml-5 md:ml-0">
                  <label className="text-xs text-gray-500 font-semibold">
                    Repite tu contraseña
                  </label>
                  <Field
                    name="repeatPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    className={
                      "text-gray-500 outline-none focus:outline-none rounded border px-4 text-xs py-1 mt-2" +
                      (errors.repeatPassword && touched.repeatPassword
                        ? " border-red-500"
                        : " border-gray-300")
                    }
                  />
                  {errors.repeatPassword && (
                    <ErrorMessage
                      name="repeatPassword"
                      component="span"
                      className="text-red-400 font-small"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className=" w-full bg-blue-500 my-3 py-1 rounded-md text-sm font-semibold text-white"
                >
                  Guardar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ password: "" }}
          onSubmit={(values) => login(values)}
          validationSchema={yup.object().shape({
            password: yup.string().required("La contreseña es requerida"),
          })}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="login-container grid w-80 p-8 mr-4">
                <div className="flex flex-col justify-center content-center">
                  <label className="text-xs font-semibold text-gray-600">
                    Contraseña
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className={
                      "text-gray-500 w-full outline-none border focus:outline-none rounded-sm px-2 text-xs py-2 mt-2" +
                      (errors.password && touched.password
                        ? " border-red-500"
                        : " border-gray-300")
                    }
                  />
                  {errors.password && (
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-400 font-small"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-10 ml-3 md:ml-0 w-full bg-global rounded-md text-md p-1 font-semibold text-white"
                >
                  Iniciar Sesion
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <span
        onClick={() => setShow(false)}
        className="text-gray-500 font-semibold px-8 py-4 cursor-pointer"
      >
        Atras
      </span>
    </>
  );
};

export default CheckPassword;

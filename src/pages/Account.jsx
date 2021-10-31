import { useState, useEffect } from "react";
import EditForm from "../components/account/EditForm";
import EmpInfo from "../components/account/EmpInfo";
import Modal from "../components/global/modal/Modal";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";
import { EmployeeService } from "../services/employe.service";

const Account = ({ showModal, setShowModal }) => {
  const { auth, setRefreshCheckLogin } = useAuth();
  console.log(auth)
  const empService = new EmployeeService();
  const [empInfo, setEmpInfo] = useState();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const getEmpInfo = () => {
      empService.getEmpById(auth.id).then((res) => {
        if (res.ok) {
          setEmpInfo(res.employee);
        }
      });
    };
    getEmpInfo();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  const logout = () => {
    empService.logout();
    setRefreshCheckLogin(true);
  };
  return (
    <Layout>
      <p className="mx-8 text-lg font-semibold">Mi cuenta</p>
      <div className="my-8 mx-8 shadow p-8 w-full rounded flex">
        <div className="w-7/12 ml-12">
          <EmpInfo empInfo={empInfo}/>
          <div className="mt-4">
            <button
              className="px-4 rounded text-white bg-red-400 text-sm py-1"
              onClick={logout}
            >
              Cerrar Sesion
            </button>
            <button
              className="px-4 rounded text-white bg-green-400 ml-4 text-sm py-1"
              onClick={() => setShowModal(true)}
            >
              Editar Perfil
            </button>
            <Modal
              title="Editar mi cuenta"
              showModal={showModal}
              setShowModal={setShowModal}
            >
              <EditForm
                setShowModal={setShowModal}
                setReload={setReload}
                empInfo={empInfo}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;

import React from "react";

const EmpInfo = ({ empInfo }) => {
  return (
    <ul>
      <li className="text-sm">
        <span className="text-base font-semibold">Nombre: </span>
        {empInfo?.nombre}
      </li>
      <li className="mt-4 text-sm">
        <span className="text-base font-semibold">Apellido: </span>
        {empInfo?.apellido}
      </li>
      <li className="mt-4 text-sm">
        <span className="text-base font-semibold">Codigo de acceso: </span>
        {empInfo?.codeAccess}
      </li>
      {empInfo?.telefono && (
        <li className="mt-4 text-sm">
          <span className="text-base font-semibold">Telefono: </span>
          {empInfo.telefono}
        </li>
      )}
      {empInfo?.direccion && (
        <li className="mt-4 text-sm">
          <span className="text-base font-semibold">Direccion: </span>
          {empInfo?.direccion}
        </li>
      )}
      {empInfo?.email && (
        <li className="mt-4 text-sm">
          <span className="text-base font-semibold">Email: </span>
          {empInfo?.email}
        </li>
      )}
    </ul>
  );
};

export default EmpInfo;

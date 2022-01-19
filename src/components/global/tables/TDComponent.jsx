import React from "react";

const TDComponent = React.memo(({ name, children,onclick,cursor }) => {
  return (
    <td className="px-4 py-2 border-b border-gray-200 bg-white text-xs font-semibold text-gray-600 w-3/5" onClick={onclick}>
      <div className="flex items-center text-center">
        <div>
          {name ? (
            <p className={cursor + " text-gray-600 font-semibold font-mono font-small whitespace-nowrap"}>
              {name}
            </p>
          ) : (
            <div className="flex font-mono">{children}</div>
          )}
        </div>
      </div>
    </td>
  );
})

export default TDComponent;

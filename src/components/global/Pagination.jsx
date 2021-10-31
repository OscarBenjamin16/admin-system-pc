import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ method, totalPages, current }) => {
  if(totalPages === 1 ){
    return null;
  }
  return (
    <div className="w-full md:flex justify-center mt-4">
      <div className="flex md:hidden">
        <button
          disabled={current === 1}
          onClick={() => method(current - 1)}
          className="bg-blue-500 text-white text-xs px-4 py-1 rounded flex justify-center items-center focus:outline-none font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather text-white feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>{" "}
          Anterior
        </button>
        <button  disabled={current === totalPages}
          onClick={() => method(current + 1)} className="bg-blue-500 text-white ml-4 text-xs px-4 py-1 rounded flex justify-center items-center focus:outline-none font-semibold">
          Siguiente{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather text-white feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather text-blue-500 feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        }
        onPageChange={(data) => method(data.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={totalPages}
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather text-blue-500 feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        }
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="flex h-7 font-medium w-full overflow-auto md:w-96 bg-white-200"
        pageClassName="w-7 hidden md:flex text-blue-500 justify-center rounded-full border ml-1 border-blue-500 items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in"
        pageLinkClassName="w-7 md:flex  justify-center text-xs  items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
        activeClassName="bg-blue-500 text-white"
        activeLinkClassName="text-white"
        previousClassName="w-10 flex justify-center items-center  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
        nextClassName="w-10 flex justify-center items-center  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
        breakClassName="w-7 flex text-blue-500 justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full"
      />
    </div>
  );
};

export default Pagination;

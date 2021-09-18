/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { generateCode } from "../../utils/regularExpression";
import ProductImg from "../../assets/product.png";
import UploadIcon from "../../assets/uploadFile.svg";
import { useDropzone } from "react-dropzone";
import { ProductService } from "../../services/product.service";
import { isEmptyProduct } from "../../utils/validations";

const Form = (props) => {
  const productService = new ProductService();
  const {
    setReload,
    setShowModal,
    marks,
    categories,
    providers,
    oldProduct,
    textButton,
  } = props;
  const [product, setProduct] = useState(values(oldProduct));
  const [product_image, setProduct_image] = useState(
    oldProduct ? oldProduct?.image : null
  );
  const [product_file, setProduct_file] = useState(null);
  const inputCode = useRef(null);
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const addImage = (id) => {
    if (oldProduct && !product_file) {
      toast.success("Se actualizo el producto con exito");

      setReload(true);

      setShowModal(false);

      return;
    }

    if (!product_file) {
      toast.warn("Se guardo el registro con una imagen por defecto!!");
      return;
    }
    productService
      .addImage(product_file, id)
      .then((res) => {
        if (res.ok) {
          toast.success("Se guardo el producto con exito");
          setReload(true);
          setShowModal(false);
          return;
        }
        toast.error("Ah ocurrido un error inesperado");
        return;
      })
      .catch(() => {
        toast.error("No se puede realizar la peticion");
      });
  };
  const addProduct = () => {
    productService
      .addProduct(product)
      .then((res) => {
        if (res.ok) {
          addImage(res.newProduct.id);
          return;
        }
        toast.error(res.message);
      })
      .catch(() => {
        toast.error("Error en el servidor");
      });
  };
  const putProduct = (product) => {
    productService
      .putProduct(product)
      .then((res) => {
        if (res.ok) {
          addImage(product.id);
          return;
        }
        toast.error(res.message);
      })
      .catch(() => {
        toast.error("Error en el servidor");
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (isEmptyProduct(product)) {
      if (product.id) {
        putProduct(product);
        return;
      }
      addProduct();
      return;
    }
    toast.warn("No dejes campos vacios!!");
  };
  const setCode = () => {
    let val = inputCode.current.value;
    val = generateCode();
    setProduct({ ...product, codigo_producto: val });
  };
  const onDropImage = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    console.log(file);
    setProduct_image(URL.createObjectURL(file));
    setProduct_file(file);
  });
  const { getRootProps: getRootImgProps, getInputProps: getInputImgProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropImage,
    });
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="hidden"
        name="id"
        onChange={onChange}
        defaultValue={product.id}
      />
      <div className="grid grid-cols-2 gap-1">
        <div className="w-72">
          <div>
            <div className="grid grid-rows-2 gap-0">
              <label>Nombre</label>
              <input
                className="rounded border border-solid p-1 text-sm w-auto"
                placeholder="Escribe el nombre"
                defaultValue={product.nombre_producto}
                name="nombre_producto"
                onChange={onChange}
              />
            </div>
            <div className="grid grid-rows-2 gap-0">
              <label>Marca</label>
              <select
                name="marca"
                onChange={onChange}
                defaultValue={oldProduct?.marca.id || "DEFAULT"}
                className="form-select border text-sm p-1 block w-full"
              >
                <option value="DEFAULT">Selecciona una marca</option>
                {marks?.map((mark, index) => (
                  <option className="text-sm" key={index} value={mark.id}>
                    {mark.marca}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-rows-2 gap-0">
              <label>Categoria</label>
              <select
                onChange={onChange}
                defaultValue={oldProduct?.categoria.id || "DEFAULT"}
                name="categoria"
                className="form-select border text-sm p-1 block w-full"
              >
                <option value="DEFAULT" disabled>
                  selecciona una categoria
                </option>
                {categories?.map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.categoria}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-rows-2 gap-0">
              <label>Proveedor</label>
              <select
                name="proveedor"
                onChange={onChange}
                defaultValue={oldProduct?.proveedor.id || "DEFAULT"}
                className="form-select border text-sm p-1 block w-full"
              >
                <option value="DEFAULT" disabled>
                  selecciona un proveedor
                </option>
                {providers?.map((prov, index) => (
                  <option key={index} value={prov.id}>
                    {prov.nombre_proveedor}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-rows-2 gap-0">
              <label>Descripcion</label>
              <textarea
                defaultValue={product.descripcion}
                name="descripcion"
                onChange={onChange}
                className="form-textarea border -mt-5"
                rows="3"
                placeholder="Enter some long form content."
              />
            </div>
            <button
              type="submit"
              className="bg-global p-2 w-28 text-center text-semibold mt-8 text-white rounded-md font-semibold text-xs mr-8"
            >
              {textButton}
            </button>
          </div>
        </div>
        <div className="w-72">
          {oldProduct && (
            <div className="grid grid-rows-2 gap-0">
              <label>Descuento</label>
              <div className="flex">
                <input
                  className="w-full border p-1 px-4 text-sm rounded border-r-0 focus:outline-none focus:border"
                  placeholder="Escribe el descuento"
                  defaultValue={product.descuento}
                  name="descuento"
                  onChange={onChange}
                />
                <span className="border px-4 py-1 text-sm rounded absolute mr-6 bg-gray-300 font-bold right-0">
                  %
                </span>
              </div>
            </div>
          )}
          {!oldProduct && (
            <div className="grid grid-rows-2 gap-0">
              <label>Codigo</label>
              <div className="flex">
                <button
                  type="button"
                  onClick={setCode}
                  className="p-1 text-sm rounded px-4 bg-green-400 text-white"
                >
                  Generar
                </button>
                <input
                  ref={inputCode}
                  onChange={onChange}
                  name="codigo_producto"
                  defaultValue={product.codigo_producto}
                  placeholder="codigo de barras"
                  className="border p-1 ml-2 rounded text-sm w-full"
                ></input>
              </div>
            </div>
          )}
          <div
            className="flex content-center justify-center"
            {...getRootImgProps()}
          >
            {product?.image ? (
              <img src={product?.image} alt="none" className="w-40 mt-8" />
            ) : (
              <img
                src={product_image ? product_image : ProductImg}
                alt="none"
                className="w-40 mt-8"
              />
            )}
          </div>
          <label className="w-full mt-2 p-1 flex items-center bg-white rounded-lg tracking-wide  border cursor-pointer">
            <img src={UploadIcon} alt="none" className="w-6 text-blue ml-2" />
            <span className="text-sm leading-normal ml-4 ">
              Seleccionar una imagen
            </span>
            <input {...getInputImgProps()} type="file" className="hidden" />
          </label>
        </div>
      </div>
    </form>
  );
};

export default Form;

const values = (prod) => {
  return {
    codigo_producto: "" || prod?.codigo_Producto,
    nombre_producto: "" || prod?.nombreProducto,
    descripcion: "" || prod?.descripcion,
    proveedor: "" || prod?.proveedor.id,
    marca: "" || prod?.marca.id,
    categoria: "" || prod?.categoria.id,
    descuento: prod?.descuento || null,
    id: null || prod?.id,
  };
};

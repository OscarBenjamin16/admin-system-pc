import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../layout/Layout";
import { ProductService } from "../services/product.service";
import Barcode from "react-barcode";
import Modal from "../components/global/modal/Modal";
import SelectImage from "../components/product/Details/SelectImage";
import { GalleryService } from "../services/gallery.service";

export default function ProductDetails() {
  const prdServ = new ProductService();
  const galleryService = new GalleryService();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [images, setImages] = useState();
  const [img, setImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getProduct = () => {
      prdServ.getProductbyId(id).then((res) => {
        if (res.ok) {
          setProduct(res.producto);
          return;
        }
        setProduct(undefined);
      });
    };
    return getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    const getImages = () => {
      setReload(false)
      galleryService.getPhotos(id).then((res) => {
        if (res.ok) {
          setImages(res.GalleryImages);
          return;
        }
        setImages(undefined);
      });
    };
    return getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,reload]);
  return (
    <Layout>
      {product ? (
        <div className="w-full grid gap-8 grid-cols-2 border p-8 py-14 shadow rounded mt-8 h-auto">
          <div className="max-w-96">
            <p className="font-thin text-sm font-mono">
              <span className="uppercase text-sm font-mono font-semibold">Nombre:</span>{" "}
              {product?.nombreProducto}
            </p>
            <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">Marca:</span>{" "}
              {product?.marca.marca}
            </p>
            <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">
                Proveedor:
              </span>{" "}
              {product?.proveedor.nombre_proveedor}
            </p>
            <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">
                Categoria:
              </span>{" "}
              {product?.categoria.categoria}
            </p>
            <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">Precio:</span> $
              {product?.costo_standar}
            </p>
            <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">
                Descuento:
              </span>{" "}
              {product?.descuento}%
            </p>
            <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">Stock:</span>{" "}
              {product?.catidad_por_unidad}
            </p>
            <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">Estado:</span>{" "}
              {product?.status ? "Activo" : "Inactivo"}
            </p>
           <div className="w-full h-auto">
           <p className="mt-2 font-thin text-xs font-mono">
              <span className="uppercase text-sm font-mono font-semibold">
                Descripcion:
              </span>{" "}
              <span className="w-96 font-mono text-xs ">
              {product?.descripcion}
              </span>
            </p>
           </div>
            <p className="mt-2 font-thin text-sm">
              <span className="uppercase text-sm font-mono font-semibold">Codigo:</span>{" "}
            </p>
            <div className="">
              <Barcode
                width={1}
                fontSize={12}
                height={60}
                value={product?.codigo_Producto}
              />
            </div>
          </div>
          <div className="max-w-96">
            <img
              src={img ? img : product?.image}
              alt="none"
              className="max-w-60 max-h-60 rounded pb-4"
            />
            <span className="mt-4 font-thin text-sm font-mono">Mas imagenes</span>
            <div className="grid grid-cols-4 gap-5 mt-4">
                <div
                  onClick={() => setImg(product?.imagen)}
                  className="border shadow p-5 rounded flex items-center justify-center"
                >
                  <img
                    className="max-h-24 img"
                    src={product?.image}
                    alt="none"
                  />
                </div>
              {images &&
                images.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setImg(img.imagen)}
                    className="border shadow p-5 rounded flex items-center justify-center"
                  >
                    <img className="max-h-24 img" src={img.imagen} alt="none" />
                  </div>
                ))}
            </div>
            {images && images?.length === 3 ? (
              ""
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="px-12 mt-4 py-1 outline-none text-white rounded bg-green-500"
              >
                Agregar foto
              </button>
            )}
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              title="Agregar foto"
            >
              <SelectImage setReload={setReload} setShowModal={setShowModal} id={id} />
            </Modal>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}

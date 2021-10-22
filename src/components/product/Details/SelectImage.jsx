import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import PRODUCT from "../../../assets/product.png";
import { GalleryService } from "../../../services/gallery.service";

export default function SelectImage({ id,setShowModal,setReload }) {
  const gallerySrv = new GalleryService();
  const [fileImage, setFileImage] = useState(PRODUCT);
  const [file, setFile] = useState();
  const onDropImage = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileImage(URL.createObjectURL(file));
    setFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps: getRootImgProps, getInputProps: getInputImgProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropImage,
    });
  const handleUpload = () => {
    gallerySrv.addPhoto(id, file).then((res) => {
      if(res.ok){
        setShowModal(false)
        toast.success("Se guardo la foto con exito")
        setReload(true)
      }
    });
  };
  return (
    <>
      <div
        {...getRootImgProps()}
        className="flex justify-center shadow rounded p-4 items-center mt-4"
      >
        <img src={fileImage} className="rounded max-w-xs max-h-52" alt="null" />
      </div>
      <label className="w-full text-xs py-1 mt-3 p-1 flex items-center bg-white rounded-lg tracking-wide  border cursor-pointer">
        <FontAwesomeIcon className="text-gray-600 ml-2" icon={faFolder} />
        <span className="text-gray-500 leading-normal ml-4 ">
          Seleccionar una imagen
        </span>
        <input {...getInputImgProps()} type="file" className="hidden" />
      </label>
      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white rounded mt-4"
      >
        Guardar
      </button>
    </>
  );
}

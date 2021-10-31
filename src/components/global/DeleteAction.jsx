import React from "react";
import Warn from "../../assets/warn.svg";
import { MarkService } from "../../services/mark.service";
import { CategoryService } from "../../services/category.service";
import { ProviderService } from "../../services/provider.service";
import { toast } from "react-toastify";
import { ProductService } from "../../services/product.service";
import { CouponService } from "../../services/coupon.service";

const DeleteAction = ({ onClose, id, setReload, type }) => {
  const markService = new MarkService();
  const categoryService = new CategoryService();
  const providerService = new ProviderService();
  const productService = new ProductService();
  const couponService = new CouponService();
  const deleteMethod = () => {
    switch (type) {
      case "provider":
        providerService
          .deleteProvider(id)
          .then((res) => {
            if (res.ok) {
              toast.success("Se elimino correctamente!!");
              setReload(true);
              return;
            }
            toast.error(res.message);
          })
          .catch(() => {
            toast.error("No se ah podido completar la accion");
          });
        break;
      case "mark":
        markService
          .deleteMark(id)
          .then((res) => {
            if (res.ok) {
              toast.success("Se elimino correctamente!!");
              setReload(true);
              return;
            }
            toast.error(res.message);
          })
          .catch(() => {
            toast.error("No se ah podido completar la accion");
          });
        break;
      case "category":
        categoryService
          .deleteCategory(id)
          .then((res) => {
            if (res.ok) {
              toast.success("Se elimino correctamente!!");
              setReload(true);
              return;
            }
            toast.error(res.message);
          })
          .catch(() => {
            toast.error("No se ah podido completar la accion");
          });
        break;
      case "product":
        productService
          .deleteProduct(id)
          .then((res) => {
            if (res.ok) {
              toast.success("Se elimino correctamente!!");
              setReload(true);
              return;
            }
            toast.error(res.message);
          })
          .catch(() => {
            toast.error("No se ah podido completar la accion");
          });
        break;
      case "coupon":
        couponService.deleteCoupon(id).then((res) => {
          if (res.ok) {
            setReload(true);
            toast.success(res.message);
            return;
          }
          toast.error(res.message);
        });
        break;
      default:
        break;
    }
    onClose();
  };
  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="flex justify-center content-center">
        <img src={Warn} alt="none" className="w-16" />
      </div>
      <p className="text-normal font-semibold text-gray-600">Esta seguro de eliminar este registro?</p>
      <button
        onClick={deleteMethod}
        className="rounded text-center text-white px-4 bg-global"
      >
        Si, eliminar
      </button>
      <button
        className="bg-red-400 ml-6 px-4 text-white rounded mt-2 text-center"
        onClick={onClose}
      >
        No, cancelar
      </button>
    </div>
  );
};

export default DeleteAction;

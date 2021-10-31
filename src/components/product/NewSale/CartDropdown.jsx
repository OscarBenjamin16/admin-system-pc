import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { OrderService } from "../../../services/order.service";
import { clearCart, getItems } from "../../../utils/cart";
import ItemDetails from "./CartDetail";

export default function CartDropdown(props) {
  const { loadCart, setLoadCart, close } = props;
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const ordService = new OrderService();
  const router = useHistory();

  useEffect(() => {
    setItems(getItems());
    setLoadCart(false);
    return;
  }, [loadCart, setLoadCart]);

  useEffect(() => {
    const rdc = items?.length
      ? items?.map((item) => item?.price).reduce((a, b) => (a && b ? a + b : 0))
      : 0;
    setTotal(rdc);
    return;
  }, [items, loadCart]);

  const saveOrder = () => {
    ordService.saveLocalOrder(items).then((res) => {
      if (res.ok) {
        clearCart();
        toast.success("Se guardo la orden con exito!");
        router.push("/sales");
        close(false);
        return;
      }
      toast.error("Error al intentar guardar la orden!!");
      return;
    });
  };
  return (
    <div>
      {items &&
        items?.map((item) => (
          <ItemDetails close={close} setLoadCart={setLoadCart} item={item} />
        ))}
      <p>Total: $ {total?.toFixed(2)}</p>
      {items?.length > 0 && (
        <button
          onClick={saveOrder}
          className="bg-blue-500 text-white rounded text-xs py-1 px-8 font-semibold"
        >
          Completar
        </button>
      )}
    </div>
  );
}

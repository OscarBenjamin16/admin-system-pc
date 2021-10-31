import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getItems, removeItem } from "../../../utils/cart";

export default function ItemDetails(props) {
  const { item, setLoadCart,close } = props;
  const remove = () => {
    
    removeItem(item, "remove");
    setLoadCart(true);
    const items = getItems();
    if(items?.length === 0){
        close(false)
    }
  };
  return (
    <div className="flex border mb-4 px-8 py-2">
      <img src={item?.img} alt="none" className="w-12" />
      <span className="text-xs font-extralight ml-4 mt-4 w-28">
        {item?.name}
      </span>
      <div className="ml-4 float-right mt-4 flex">
        <span className="text-xs font-extralight mr-6">{item?.qt}</span>
        <span className="text-xs w-14">${item?.price.toFixed(2)}</span>
        <div onClick={remove} className="cursor-pointer">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </div>
  );
}

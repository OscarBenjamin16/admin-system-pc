export function setItemCart(product) {
  if (getItems()) {
    const cartsItems = getItems();
    if (product) {
      const filtered = cartsItems.filter((a) => a.id === product.id);
      if (filtered.length === 1) {
        sumItemCart(product);
        return;
      }
      const newItem = cartsItems.concat(product);
      localStorage.setItem("cart", JSON.stringify(newItem));
      return { newItem };
    }
    return;
  }
  localStorage.setItem("cart", JSON.stringify([product]));
}

export function getItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function removeItem(item, option) {
  if (item) {
    if (getItems()) {
      const cartsItems = getItems();
      const fnd = cartsItems.find((a) => a.id === item.id);
      const index = cartsItems.indexOf(fnd);
      if (option === "remove" || cartsItems[index].qt <= 1) {
        cartsItems.splice(index, 1);
      } else if (cartsItems[index].qt > 1) {
        cartsItems[index].price =
          cartsItems[index].price -
          cartsItems[index].price / cartsItems[index].qt;
        cartsItems[index].original_price =
          cartsItems[index].original_price -
          cartsItems[index].original_price / cartsItems[index].qt;
        cartsItems[index].qt--;
      }
      localStorage.setItem("cart", JSON.stringify(cartsItems));
    }
  }
}

export function sumItemCart(product) {
  const cartsItems = getItems();
  const fnd = cartsItems.find((a) => a.id === product.id);
  const index = cartsItems.indexOf(fnd);
  cartsItems[index].price =
    cartsItems[index].price + cartsItems[index].price / cartsItems[index].qt;
  cartsItems[index].original_price =
    cartsItems[index].original_price +
    cartsItems[index].original_price / cartsItems[index].qt;
  cartsItems[index].qt++;
  localStorage.setItem("cart", JSON.stringify(cartsItems));
}
export function clearCart() {
  localStorage.removeItem("cart");
}

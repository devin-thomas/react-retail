/* eslint-disable react-refresh/only-export-components */

import { createContext } from "react";
import { usePersistentReducer } from "../hooks/usePersistentReducer";
import { STORAGE_KEYS } from "../lib/constants";
import {
  cartReducer,
  initialCartState,
  validateCartState,
} from "../reducers/cartReducer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, dispatch] = usePersistentReducer(cartReducer, initialCartState, {
    storageKey: STORAGE_KEYS.cart,
    validate: validateCartState,
  });

  function addItem(product) {
    dispatch({ type: "cart/add", payload: product });
  }

  function updateQuantity(productId, quantity) {
    dispatch({
      type: "cart/updateQuantity",
      payload: { productId, quantity },
    });
  }

  function removeItem(productId) {
    dispatch({ type: "cart/remove", payload: { productId } });
  }

  function clearCart() {
    dispatch({ type: "cart/clear" });
  }

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const total = cartItems.reduce(
    (runningTotal, item) => runningTotal + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    itemCount,
    total,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

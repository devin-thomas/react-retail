export const initialCartState = [];

function normalizeCartItem(product) {
  return {
    id: product.id,
    title: product.title,
    category: product.category,
    image: product.image,
    price: product.price,
    quantity: 1,
  };
}

function normalizeQuantity(quantity) {
  const numericQuantity = Number(quantity);

  if (!Number.isFinite(numericQuantity)) {
    return 0;
  }

  return Math.max(0, Math.floor(numericQuantity));
}

export function validateCartState(value) {
  if (!Array.isArray(value)) {
    return initialCartState;
  }

  return value
    .filter((item) => item && typeof item === "object" && Number.isFinite(item.id))
    .map((item) => ({
      id: item.id,
      title: typeof item.title === "string" ? item.title : "Unknown item",
      category: typeof item.category === "string" ? item.category : "General",
      image: typeof item.image === "string" ? item.image : "",
      price: Number.isFinite(item.price) ? item.price : 0,
      quantity: Math.max(1, normalizeQuantity(item.quantity)),
    }));
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "cart/add": {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, normalizeCartItem(action.payload)];
    }
    case "cart/updateQuantity": {
      const nextQuantity = normalizeQuantity(action.payload.quantity);

      return state
        .map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: nextQuantity }
            : item
        )
        .filter((item) => item.quantity > 0);
    }
    case "cart/remove":
      return state.filter((item) => item.id !== action.payload.productId);
    case "cart/clear":
      return initialCartState;
    default:
      return state;
  }
}

export const STORAGE_KEY = "react-retail-store";

export const initialState = {
  cart: [],
  isAuthenticated: false,
  profileName: "",
  recentlyViewed: [],
};

export function normalizeStoredState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialState;
    }

    const parsed = JSON.parse(raw);
    return {
      ...initialState,
      ...parsed,
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      recentlyViewed: Array.isArray(parsed.recentlyViewed)
        ? parsed.recentlyViewed
        : [],
    };
  } catch {
    return initialState;
  }
}

export function appReducer(state, action) {
  switch (action.type) {
    case "auth/login":
      return {
        ...state,
        isAuthenticated: true,
        profileName: action.payload.name,
      };
    case "auth/logout":
      return {
        ...state,
        isAuthenticated: false,
        profileName: "",
      };
    case "cart/add": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "cart/update":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "cart/remove":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "cart/clear":
      return {
        ...state,
        cart: [],
      };
    case "viewed/add": {
      const nextViewed = [
        action.payload.id,
        ...state.recentlyViewed.filter((id) => id !== action.payload.id),
      ];
      return {
        ...state,
        recentlyViewed: nextViewed.slice(0, 4),
      };
    }
    default:
      return state;
  }
}

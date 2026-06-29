export const initialRecentlyViewedState = [];

export function validateRecentlyViewedState(value) {
  if (!Array.isArray(value)) {
    return initialRecentlyViewedState;
  }

  return value.filter((entry) => Number.isFinite(entry)).slice(0, 6);
}

export function recentlyViewedReducer(state, action) {
  switch (action.type) {
    case "recentlyViewed/track": {
      const nextIds = [
        action.payload.productId,
        ...state.filter((productId) => productId !== action.payload.productId),
      ];

      return nextIds.slice(0, 6);
    }
    default:
      return state;
  }
}

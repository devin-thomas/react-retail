/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback } from "react";
import { usePersistentReducer } from "../hooks/usePersistentReducer";
import { STORAGE_KEYS } from "../lib/constants";
import {
  initialRecentlyViewedState,
  recentlyViewedReducer,
  validateRecentlyViewedState,
} from "../reducers/recentlyViewedReducer";

export const RecentlyViewedContext = createContext(null);

export function RecentlyViewedProvider({ children }) {
  const [productIds, dispatch] = usePersistentReducer(
    recentlyViewedReducer,
    initialRecentlyViewedState,
    {
      storageKey: STORAGE_KEYS.recentlyViewed,
      validate: validateRecentlyViewedState,
    }
  );

  const trackProduct = useCallback((productId) => {
    dispatch({
      type: "recentlyViewed/track",
      payload: { productId },
    });
  }, [dispatch]);

  const value = {
    productIds,
    trackProduct,
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

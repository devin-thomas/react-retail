import { useContext } from "react";
import { RecentlyViewedContext } from "../contexts/RecentlyViewedContext";

export function useRecentlyViewed() {
  const value = useContext(RecentlyViewedContext);

  if (!value) {
    throw new Error(
      "useRecentlyViewed must be used within RecentlyViewedProvider."
    );
  }

  return value;
}

import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../lib/api";

export function useProductQuery(productId) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProduct(productId),
    enabled: Boolean(productId),
  });
}

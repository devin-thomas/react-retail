import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/api";

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

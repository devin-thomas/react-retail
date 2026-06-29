import { useMutation } from "@tanstack/react-query";
import { submitOrder } from "../../lib/api";

export function useSubmitOrderMutation(options = {}) {
  return useMutation({
    mutationFn: submitOrder,
    ...options,
  });
}

import { API_BASE } from "./constants";

async function readJson(response, fallbackMessage) {
  if (response.ok) {
    return response.json();
  }

  let message = fallbackMessage;

  try {
    const errorBody = await response.json();
    if (errorBody?.message) {
      message = errorBody.message;
    }
  } catch {
    // Keep the fallback message when the response body is not JSON.
  }

  throw new Error(message);
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  return readJson(response, "Products could not be loaded.");
}

export async function fetchProduct(productId) {
  const response = await fetch(`${API_BASE}/products/${productId}`);
  return readJson(response, "The product could not be loaded.");
}

export async function submitOrder(payload) {
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return readJson(response, "The order could not be submitted.");
}

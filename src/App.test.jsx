import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App";
import { appReducer } from "./store";

const products = [
  {
    id: 1,
    title: "React Retail T-Shirt",
    price: 19.99,
    description: "A comfy tee for frontend devs.",
    image: "https://placehold.co/300x200?text=React+Retail+T-Shirt",
    category: "Apparel",
  },
];

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

describe("appReducer", () => {
  test("adds and updates cart items predictably", () => {
    const addedState = appReducer(
      {
        cart: [],
        isAuthenticated: false,
        profileName: "",
        recentlyViewed: [],
      },
      { type: "cart/add", payload: products[0] }
    );

    const updatedState = appReducer(addedState, {
      type: "cart/update",
      payload: { id: 1, quantity: 3 },
    });

    expect(updatedState.cart[0].quantity).toBe(3);
  });
});

describe("React Retail", () => {
  beforeEach(() => {
    const storage = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn((key) => storage[key] ?? null),
        setItem: vi.fn((key, value) => {
          storage[key] = value;
        }),
        clear: vi.fn(() => {
          Object.keys(storage).forEach((key) => delete storage[key]);
        }),
      },
      writable: true,
    });
    window.localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn((url) => {
        if (String(url).includes("/products")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(products),
          });
        }

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 1,
              items: [],
              customer: {},
              createdAt: new Date().toISOString(),
            }),
        });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("loads products and adds one to the cart", async () => {
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText("React Retail T-Shirt")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    await waitFor(() =>
      expect(screen.getByRole("link", { name: "Cart (1)" })).toBeInTheDocument()
    );
  });
});

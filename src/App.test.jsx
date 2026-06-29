import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cartReducer, initialCartState } from "./reducers/cartReducer";
import { renderApp } from "./test/renderApp";

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

describe("cartReducer", () => {
  test("adds products and updates quantities predictably", () => {
    const afterAdd = cartReducer(initialCartState, {
      type: "cart/add",
      payload: products[0],
    });

    const afterSecondAdd = cartReducer(afterAdd, {
      type: "cart/add",
      payload: products[0],
    });

    const afterUpdate = cartReducer(afterSecondAdd, {
      type: "cart/updateQuantity",
      payload: { productId: 1, quantity: 4 },
    });

    expect(afterUpdate).toHaveLength(1);
    expect(afterUpdate[0].quantity).toBe(4);
  });
});

describe("React Retail", () => {
  beforeEach(() => {
    const storage = {};

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: vi.fn((key) => storage[key] ?? null),
        setItem: vi.fn((key, value) => {
          storage[key] = value;
        }),
        removeItem: vi.fn((key) => {
          delete storage[key];
        }),
        clear: vi.fn(() => {
          Object.keys(storage).forEach((key) => delete storage[key]);
        }),
      },
    });

    window.localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn((url, options) => {
        if (String(url).endsWith("/products")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(products),
          });
        }

        if (String(url).includes("/products/")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(products[0]),
          });
        }

        if (String(url).endsWith("/orders")) {
          const requestBody = JSON.parse(options.body);

          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                id: 12,
                createdAt: "2026-06-29T18:00:00.000Z",
                customer: requestBody.customer,
                items: requestBody.items,
              }),
          });
        }

        return Promise.reject(new Error(`Unexpected request: ${String(url)}`));
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("redirects through login and completes checkout", async () => {
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText("React Retail T-Shirt")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    await user.click(screen.getByRole("link", { name: "Checkout" }));

    expect(
      await screen.findByRole("heading", { name: "Sign in to continue" })
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText("Display name"), "Devin Thomas");
    await user.click(
      screen.getByRole("button", { name: "Continue to checkout" })
    );

    expect(
      await screen.findByRole("heading", { name: "Review your order" })
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText("Email"), "devin@example.com");
    await user.type(screen.getByLabelText("Address"), "123 State Street");
    await user.click(screen.getByRole("button", { name: "Place order" }));

    expect(
      await screen.findByRole("heading", { name: "Thanks for your purchase" })
    ).toBeInTheDocument();
  });
});

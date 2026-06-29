import "./App.css";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { appReducer, initialState, normalizeStoredState, STORAGE_KEY } from "./store";

const API_BASE = "http://localhost:5174/api";
const IS_GITHUB_PAGES = window.location.hostname.includes("github.io");
const StoreContext = createContext(null);

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}


function useStore() {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error("Store context is unavailable.");
  }

  return value;
}

function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) {
        throw new Error("Products could not be loaded.");
      }

      return response.json();
    },
  });
}

function useProduct(productId) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/products/${productId}`);
      if (!response.ok) {
        throw new Error("The product could not be loaded.");
      }

      return response.json();
    },
  });
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function AppHeader() {
  const {
    state: { cart, isAuthenticated, profileName },
    dispatch,
  } = useStore();

  return (
    <header className="app-header">
      <div className="header-brand">
        <p className="header-kicker">Intermediate React capstone</p>
        <Link to="/" className="brand-link">
          React Retail
        </Link>
      </div>
      <nav className="header-nav">
        <Link to="/">Catalog</Link>
        <Link to="/cart">Cart ({cart.reduce((count, item) => count + item.quantity, 0)})</Link>
        <Link to="/checkout">Checkout</Link>
        {isAuthenticated ? (
          <button
            className="ghost-button"
            onClick={() => dispatch({ type: "auth/logout" })}
          >
            Sign out {profileName}
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

function ProductCard({ product }) {
  const { dispatch } = useStore();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-shell">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      <div className="product-copy">
        <p className="product-category">{product.category}</p>
        <h2>{product.title}</h2>
        <p className="product-description">{product.description}</p>
      </div>
      <div className="product-footer">
        <strong>{formatCurrency(product.price)}</strong>
        <button
          className="primary-button"
          onClick={() => dispatch({ type: "cart/add", payload: product })}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

function CatalogPage() {
  const { data, isLoading, isError, error } = useProducts();
  const {
    state: { recentlyViewed },
  } = useStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    if (!data) {
      return ["All"];
    }

    return ["All", ...new Set(data.map((product) => product.category))];
  }, [data]);

  const filteredProducts = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((product) => {
      const matchesCategory =
        category === "All" ? true : product.category === category;
      const haystack = `${product.title} ${product.description}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, data, search]);

  const recentlyViewedProducts = useMemo(() => {
    if (!data || recentlyViewed.length === 0) {
      return [];
    }

    return recentlyViewed
      .map((id) => data.find((product) => product.id === id))
      .filter(Boolean);
  }, [data, recentlyViewed]);

  if (isLoading) {
    return <p className="state-panel">Loading the catalog...</p>;
  }

  if (isError) {
    return <p className="state-panel state-panel-error">{error.message}</p>;
  }

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="hero-kicker">Modern client/server state separation</p>
          <h1>Thoughtful commerce for frontend engineers</h1>
          <p>
            Browse the catalog, save items across routes, and step through a
            protected checkout flow backed by a local mock API.
          </p>
        </div>
        <div className="hero-stats">
          <div>
            <span>{data.length}</span>
            <p>products</p>
          </div>
          <div>
            <span>{categories.length - 1}</span>
            <p>categories</p>
          </div>
        </div>
      </section>

      <section className="toolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
      </section>

      {recentlyViewedProducts.length > 0 ? (
        <section className="recently-viewed">
          <div className="section-heading">
            <h2>Recently viewed</h2>
            <p>Tracked in client state and restored from local storage.</p>
          </div>
          <div className="recent-grid">
            {recentlyViewedProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="recent-tile">
                <span>{product.title}</span>
                <strong>{formatCurrency(product.price)}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="section-heading">
          <h2>Catalog</h2>
          <p>{filteredProducts.length} matching products</p>
        </div>
        {filteredProducts.length === 0 ? (
          <p className="state-panel">No products match that filter.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const { data, isLoading, isError, error } = useProduct(productId);

  useEffect(() => {
    if (data) {
      dispatch({ type: "viewed/add", payload: data });
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <p className="state-panel">Loading product details...</p>;
  }

  if (isError) {
    return <p className="state-panel state-panel-error">{error.message}</p>;
  }

  return (
    <div className="page-shell detail-grid">
      <button className="ghost-button detail-back" onClick={() => navigate(-1)}>
        Back
      </button>
      <img src={data.image} alt={data.title} className="detail-image" />
      <div className="detail-copy">
        <p className="product-category">{data.category}</p>
        <h1>{data.title}</h1>
        <strong className="detail-price">{formatCurrency(data.price)}</strong>
        <p>{data.description}</p>
        <div className="detail-actions">
          <button
            className="primary-button"
            onClick={() => dispatch({ type: "cart/add", payload: data })}
          >
            Add to cart
          </button>
          <Link to="/cart" className="secondary-link">
            Review cart
          </Link>
        </div>
      </div>
    </div>
  );
}

function CartPage() {
  const {
    state: { cart },
    dispatch,
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="page-shell">
        <p className="state-panel">Your cart is empty. Add a product to continue.</p>
      </div>
    );
  }

  return (
    <div className="page-shell cart-layout">
      <section className="cart-items">
        <div className="section-heading">
          <h1>Cart</h1>
          <p>Shared state persists while you move through the app.</p>
        </div>
        {cart.map((item) => (
          <article key={item.id} className="cart-row">
            <div>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
            </div>
            <div className="cart-controls">
              <label>
                Qty
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(event) =>
                    dispatch({
                      type: "cart/update",
                      payload: {
                        id: item.id,
                        quantity: Number(event.target.value),
                      },
                    })
                  }
                />
              </label>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
              <button
                className="ghost-button"
                onClick={() => dispatch({ type: "cart/remove", payload: item })}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>
      <aside className="summary-card">
        <h2>Summary</h2>
        <p>{cart.reduce((count, item) => count + item.quantity, 0)} items</p>
        <strong>{formatCurrency(getCartTotal(cart))}</strong>
        <Link className="primary-button button-link" to="/checkout">
          Proceed to checkout
        </Link>
      </aside>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { isAuthenticated },
    dispatch,
  } = useStore();
  const [name, setName] = useState("");

  const redirectTo = location.state?.from?.pathname ?? "/checkout";

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="page-shell auth-shell">
      <form
        className="auth-card"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch({
            type: "auth/login",
            payload: { name: name.trim() || "Retail guest" },
          });
          navigate(redirectTo, { replace: true });
        }}
      >
        <p className="hero-kicker">Protected route demo</p>
        <h1>Sign in to continue</h1>
        <p>Checkout is protected and returns you to the route you asked for.</p>
        <label>
          Display name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Devin Thomas"
          />
        </label>
        <button className="primary-button" type="submit">
          Continue to checkout
        </button>
      </form>
    </div>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  const {
    state: { cart, profileName },
    dispatch,
  } = useStore();
  const [customer, setCustomer] = useState({
    name: profileName,
    email: "",
    address: "",
  });

  const orderMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "The order could not be submitted.");
      }

      return response.json();
    },
    onSuccess: (order) => {
      dispatch({ type: "cart/clear" });
      navigate("/checkout/success", { state: { order } });
    },
  });

  if (cart.length === 0) {
    return (
      <div className="page-shell">
        <p className="state-panel">Your cart is empty. Add items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="page-shell checkout-layout">
      <section className="summary-card">
        <h1>Checkout</h1>
        {cart.map((item) => (
          <div key={item.id} className="summary-line">
            <span>
              {item.title} x {item.quantity}
            </span>
            <strong>{formatCurrency(item.price * item.quantity)}</strong>
          </div>
        ))}
        <div className="summary-line total-line">
          <span>Total</span>
          <strong>{formatCurrency(getCartTotal(cart))}</strong>
        </div>
      </section>
      <form
        className="auth-card"
        onSubmit={(event) => {
          event.preventDefault();
          orderMutation.mutate({ items: cart, customer });
        }}
      >
        <h2>Customer details</h2>
        <label>
          Name
          <input
            type="text"
            required
            value={customer.name}
            onChange={(event) =>
              setCustomer((current) => ({ ...current, name: event.target.value }))
            }
          />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={customer.email}
            onChange={(event) =>
              setCustomer((current) => ({ ...current, email: event.target.value }))
            }
          />
        </label>
        <label>
          Address
          <textarea
            required
            rows="4"
            value={customer.address}
            onChange={(event) =>
              setCustomer((current) => ({ ...current, address: event.target.value }))
            }
          />
        </label>
        {orderMutation.isError ? (
          <p className="state-panel state-panel-error compact-state">
            {orderMutation.error.message}
          </p>
        ) : null}
        <button className="primary-button" type="submit" disabled={orderMutation.isPending}>
          {orderMutation.isPending ? "Submitting..." : "Place order"}
        </button>
      </form>
    </div>
  );
}

function CheckoutSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <p className="hero-kicker">Order confirmed</p>
        <h1>Thanks for your purchase</h1>
        <p>Your order #{order.id} was confirmed at {new Date(order.createdAt).toLocaleString()}.</p>
        <Link className="primary-button button-link" to="/">
          Back to catalog
        </Link>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const {
    state: { isAuthenticated },
  } = useStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function NotFoundPage() {
  return (
    <div className="page-shell">
      <p className="state-panel">That route does not exist.</p>
    </div>
  );
}

function HostedLandingPage() {
  return (
    <div className="landing-shell">
      <section className="hero-panel landing-panel">
        <div>
          <p className="hero-kicker">GitHub Pages portfolio landing</p>
          <h1>React Retail</h1>
          <p>
            This repository contains a full local Vite + Express capstone.
            GitHub Pages hosts this overview because the mock checkout API is a
            local runtime, not a static deployment target.
          </p>
        </div>
      </section>
      <section className="landing-grid">
        <article className="summary-card">
          <h2>Included features</h2>
          <ul>
            <li>TanStack Query for server state</li>
            <li>Context + reducer for cart and auth</li>
            <li>Protected checkout with redirect-after-login</li>
            <li>Local persistence for cart, login, and recent views</li>
          </ul>
        </article>
        <article className="summary-card">
          <h2>Run locally</h2>
          <ol>
            <li>`npm install`</li>
            <li>`npm run dev:api`</li>
            <li>`npm run dev`</li>
          </ol>
        </article>
      </section>
    </div>
  );
}

function RetailApp() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <CheckoutSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  const Router = IS_GITHUB_PAGES ? HashRouter : BrowserRouter;
  const [state, dispatch] = useReducer(appReducer, initialState, normalizeStoredState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const storeValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreContext.Provider value={storeValue}>
      <Router>
        {IS_GITHUB_PAGES ? <HostedLandingPage /> : <RetailApp />}
      </Router>
    </StoreContext.Provider>
  );
}

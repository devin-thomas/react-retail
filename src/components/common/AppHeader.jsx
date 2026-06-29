import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

function navLinkClass({ isActive }) {
  return [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
      : "bg-white/70 text-slate-700 hover:bg-white",
  ].join(" ");
}

export function AppHeader() {
  const { isAuthenticated, profileName, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Application Architecture Capstone
          </p>
          <NavLink className="text-3xl font-black tracking-tight text-slate-950" to="/">
            React Retail
          </NavLink>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <nav className="flex flex-wrap gap-2">
            <NavLink className={navLinkClass} to="/">
              Catalog
            </NavLink>
            <NavLink className={navLinkClass} to="/cart">
              Cart ({itemCount})
            </NavLink>
            <NavLink className={navLinkClass} to="/checkout">
              Checkout
            </NavLink>
            <NavLink className={navLinkClass} to="/login">
              {isAuthenticated ? "Account" : "Login"}
            </NavLink>
          </nav>
          {isAuthenticated ? (
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-950">
                Signed in as {profileName}
              </span>
              <button
                className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white"
                onClick={logout}
                type="button"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

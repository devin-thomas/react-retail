import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [name, setName] = useState("");

  const redirectTarget = location.state?.from?.pathname ?? "/checkout";

  if (isAuthenticated) {
    return <Navigate replace to={redirectTarget} />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(name);
    navigate(redirectTarget, { replace: true });
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        className="grid gap-5 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-2xl shadow-amber-950/8 sm:p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Protected route demo
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            Sign in to continue
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Checkout requires authentication and returns you to the exact route
            you originally requested.
          </p>
        </div>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Display name
          <input
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
            onChange={(event) => setName(event.target.value)}
            placeholder="Devin Thomas"
            type="text"
            value={name}
          />
        </label>
        <button
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          type="submit"
        >
          Continue to checkout
        </button>
      </form>
    </div>
  );
}

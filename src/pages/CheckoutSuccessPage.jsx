import { Link, Navigate, useLocation } from "react-router-dom";

export function CheckoutSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-5 rounded-[2rem] border border-white/70 bg-white/90 p-6 text-center shadow-2xl shadow-amber-950/8 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
        Order confirmed
      </p>
      <h1 className="text-4xl font-black tracking-tight text-slate-950">
        Thanks for your purchase
      </h1>
      <p className="text-base leading-7 text-slate-600">
        Order #{order.id} was submitted on{" "}
        {new Date(order.createdAt).toLocaleString()}.
      </p>
      <div className="rounded-[1.5rem] bg-emerald-50 px-5 py-4 text-left text-sm text-emerald-950">
        <p className="font-semibold">Shipping to</p>
        <p>{order.customer?.name}</p>
        <p>{order.customer?.email}</p>
        <p>{order.customer?.address}</p>
      </div>
      <Link
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        to="/"
      >
        Back to catalog
      </Link>
    </div>
  );
}

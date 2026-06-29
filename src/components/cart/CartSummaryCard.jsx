import { Link } from "react-router-dom";
import { formatCurrency } from "../../lib/formatters";

export function CartSummaryCard({ itemCount, total }) {
  return (
    <aside className="space-y-5 rounded-[1.75rem] border border-white/70 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15">
      <div className="space-y-1">
        <h2 className="text-2xl font-black tracking-tight">Order summary</h2>
        <p className="text-sm text-slate-300">
          Shared cart state stays available across routes until checkout.
        </p>
      </div>
      <div className="rounded-[1.25rem] bg-white/8 p-4">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base text-slate-200">Total</span>
          <span className="text-3xl font-black">{formatCurrency(total)}</span>
        </div>
      </div>
      <Link
        className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
        to="/checkout"
      >
        Proceed to checkout
      </Link>
    </aside>
  );
}

import { formatCurrency } from "../../lib/formatters";

export function CartItemRow({ item, onQuantityChange, onRemove }) {
  return (
    <article className="grid gap-4 rounded-[1.5rem] border border-white/70 bg-white/90 p-5 shadow-lg shadow-amber-950/5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
          {item.category}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
          {item.title}
        </h2>
        <p className="text-sm text-slate-500">
          Unit price {formatCurrency(item.price)}
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Quantity
          <input
            className="w-28 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
            min="0"
            onChange={(event) => onQuantityChange(item.id, event.target.value)}
            type="number"
            value={item.quantity}
          />
        </label>
        <div className="min-w-28 text-left sm:text-right">
          <p className="text-sm text-slate-500">Subtotal</p>
          <p className="text-xl font-black text-slate-950">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
        <button
          className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          onClick={() => onRemove(item.id)}
          type="button"
        >
          Remove
        </button>
      </div>
    </article>
  );
}

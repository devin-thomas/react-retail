import { formatCurrency } from "../../lib/formatters";

export function CheckoutSummary({ cartItems, total }) {
  return (
    <section className="space-y-5 rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-amber-950/8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
          Protected checkout
        </p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">
          Review your order
        </h1>
      </div>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            className="flex items-center justify-between gap-3 rounded-[1.25rem] bg-amber-50/70 px-4 py-4"
            key={item.id}
          >
            <div>
              <p className="font-semibold text-slate-950">{item.title}</p>
              <p className="text-sm text-slate-600">
                {item.quantity} x {formatCurrency(item.price)}
              </p>
            </div>
            <strong className="text-slate-950">
              {formatCurrency(item.price * item.quantity)}
            </strong>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-lg font-black text-slate-950">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </section>
  );
}

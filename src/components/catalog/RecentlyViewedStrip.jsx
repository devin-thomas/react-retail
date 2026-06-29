import { Link } from "react-router-dom";
import { formatCurrency } from "../../lib/formatters";

export function RecentlyViewedStrip({ products }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Recently viewed
          </h2>
          <p className="text-sm text-slate-600">
            Client-only state persisted in local storage for this session.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/70 bg-white/85 px-4 py-4 shadow-lg shadow-amber-950/5 transition hover:-translate-y-0.5 hover:bg-white"
            key={product.id}
            to={`/products/${product.id}`}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                {product.category}
              </p>
              <p className="mt-2 truncate text-base font-bold text-slate-950">
                {product.title}
              </p>
            </div>
            <span className="text-sm font-bold text-slate-700">
              {formatCurrency(product.price)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

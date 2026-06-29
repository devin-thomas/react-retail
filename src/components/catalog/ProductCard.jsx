import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../lib/formatters";

export function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-xl shadow-amber-950/8">
      <Link
        className="block aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,180,93,0.22),_transparent_25%),linear-gradient(180deg,_#fff7ea_0%,_#f4ede2_100%)]"
        to={`/products/${product.id}`}
      >
        <img
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
          src={product.image}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
            {product.category}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            {product.title}
          </h2>
          <p className="text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xl font-black text-slate-950">
            {formatCurrency(product.price)}
          </span>
          <button
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={() => addItem(product)}
            type="button"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

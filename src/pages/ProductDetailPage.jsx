import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StatePanel } from "../components/common/StatePanel";
import { useProductQuery } from "../hooks/queries/useProductQuery";
import { useCart } from "../hooks/useCart";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { formatCurrency } from "../lib/formatters";

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { addItem } = useCart();
  const { trackProduct } = useRecentlyViewed();
  const productQuery = useProductQuery(productId);

  useEffect(() => {
    if (productQuery.data) {
      trackProduct(productQuery.data.id);
    }
  }, [productQuery.data, trackProduct]);

  if (productQuery.isLoading) {
    return <StatePanel>Loading product details...</StatePanel>;
  }

  if (productQuery.isError) {
    return <StatePanel tone="error">{productQuery.error.message}</StatePanel>;
  }

  const product = productQuery.data;

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-4">
        <button
          className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
          onClick={() => navigate(-1)}
          type="button"
        >
          Back
        </button>
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-2xl shadow-amber-950/8">
          <img
            alt={product.title}
            className="h-full w-full bg-[linear-gradient(180deg,_#fff7ea_0%,_#f0e5d5_100%)] object-cover"
            src={product.image}
          />
        </div>
      </div>
      <div className="space-y-6 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-2xl shadow-amber-950/8 lg:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            {product.category}
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            {product.title}
          </h1>
          <p className="text-3xl font-black text-slate-900">
            {formatCurrency(product.price)}
          </p>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={() => addItem(product)}
            type="button"
          >
            Add to cart
          </button>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            to="/cart"
          >
            Review cart
          </Link>
        </div>
      </div>
    </section>
  );
}

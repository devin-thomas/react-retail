export function CatalogHero({ productCount, categoryCount }) {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,_rgba(255,248,235,0.98),_rgba(255,255,255,0.96)),radial-gradient(circle_at_top_left,_rgba(244,180,93,0.25),_transparent_30%)] p-6 shadow-2xl shadow-amber-950/10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.9fr)] lg:p-8">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">
          Separate server and client state
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          A routed storefront built around React Query, reducers, and reusable
          components.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
          Browse live catalog data, keep cart and auth state across routes, and
          complete a protected checkout flow backed by a mock local API.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="rounded-[1.5rem] bg-slate-950 px-5 py-6 text-white shadow-lg shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-200">
            Products
          </p>
          <p className="mt-3 text-4xl font-black">{productCount}</p>
        </div>
        <div className="rounded-[1.5rem] bg-white px-5 py-6 text-slate-900 shadow-lg shadow-amber-950/10">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-700">
            Categories
          </p>
          <p className="mt-3 text-4xl font-black">{categoryCount}</p>
        </div>
      </div>
    </section>
  );
}

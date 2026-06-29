export function HostedLandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(242,197,133,0.3),_transparent_25%),linear-gradient(180deg,_#fffdf8_0%,_#f6efe4_55%,_#efe3cf_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-amber-950/10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700">
            GitHub Pages overview
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950">
            React Retail
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            This repo contains a full Vite storefront with a local Express
            checkout API. GitHub Pages hosts a lightweight overview because the
            live order flow depends on that local API server.
          </p>
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-amber-950/8">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Included architecture
            </h2>
            <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
              <li>React Query hooks for catalog, product detail, and order submission.</li>
              <li>Separate auth, cart, and recently viewed client-state providers.</li>
              <li>Protected checkout with redirect-after-login behavior.</li>
              <li>Tailwind-based components split across pages, hooks, and routes.</li>
            </ul>
          </article>
          <article className="rounded-[1.75rem] border border-white/70 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15">
            <h2 className="text-2xl font-black tracking-tight">Run locally</h2>
            <ol className="mt-4 space-y-3 text-base leading-7 text-slate-200">
              <li>`npm install`</li>
              <li>`npm run dev:api`</li>
              <li>`npm run dev`</li>
            </ol>
          </article>
        </section>
      </div>
    </div>
  );
}

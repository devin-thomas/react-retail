export function CheckoutForm({
  customer,
  isSubmitting,
  errorMessage,
  onChange,
  onSubmit,
}) {
  return (
    <form
      className="grid gap-5 rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-amber-950/8"
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Customer details
        </h2>
        <p className="text-sm text-slate-600">
          Orders submit through a React Query mutation and surface server
          errors directly in the UI.
        </p>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Name
        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          name="name"
          onChange={onChange}
          required
          type="text"
          value={customer.name}
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Email
        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          name="email"
          onChange={onChange}
          required
          type="email"
          value={customer.email}
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Address
        <textarea
          className="min-h-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          name="address"
          onChange={onChange}
          required
          rows="4"
          value={customer.address}
        />
      </label>
      {errorMessage ? (
        <div className="rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {errorMessage}
        </div>
      ) : null}
      <button
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Submitting order..." : "Place order"}
      </button>
    </form>
  );
}

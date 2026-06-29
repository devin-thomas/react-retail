export function StatePanel({ children, tone = "default" }) {
  const toneClasses =
    tone === "error"
      ? "border-rose-200 bg-rose-50 text-rose-900"
      : "border-white/70 bg-white/80 text-slate-700";

  return (
    <div
      className={`rounded-[2rem] border px-6 py-10 text-center shadow-lg shadow-amber-950/5 ${toneClasses}`}
    >
      <p className="mx-auto max-w-2xl text-base leading-7">{children}</p>
    </div>
  );
}

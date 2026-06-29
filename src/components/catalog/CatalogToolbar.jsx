export function CatalogToolbar({
  categories,
  searchValue,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <section className="grid gap-4 rounded-[1.75rem] border border-white/70 bg-white/75 p-4 shadow-lg shadow-amber-950/5 md:grid-cols-[minmax(0,1fr)_240px]">
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Search products
        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or description"
          type="search"
          value={searchValue}
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Category
        <select
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-200"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

import { useMemo } from "react";
import { ProductCard } from "../components/catalog/ProductCard";
import { CatalogHero } from "../components/catalog/CatalogHero";
import { CatalogToolbar } from "../components/catalog/CatalogToolbar";
import { RecentlyViewedStrip } from "../components/catalog/RecentlyViewedStrip";
import { StatePanel } from "../components/common/StatePanel";
import { useCatalogFilters } from "../hooks/useCatalogFilters";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useProductsQuery } from "../hooks/queries/useProductsQuery";

const EMPTY_PRODUCTS = [];

export function CatalogPage() {
  const productsQuery = useProductsQuery();
  const { productIds } = useRecentlyViewed();
  const products = productsQuery.data ?? EMPTY_PRODUCTS;
  const {
    categories,
    filteredProducts,
    searchInput,
    selectedCategory,
    updateSearch,
    setSelectedCategory,
  } = useCatalogFilters(products);

  const recentlyViewedProducts = useMemo(() => {
    if (productIds.length === 0) {
      return [];
    }

    return productIds
      .map((productId) => products.find((product) => product.id === productId))
      .filter(Boolean);
  }, [productIds, products]);

  if (productsQuery.isLoading) {
    return <StatePanel>Loading the catalog...</StatePanel>;
  }

  if (productsQuery.isError) {
    return <StatePanel tone="error">{productsQuery.error.message}</StatePanel>;
  }

  return (
    <div className="space-y-6">
      <CatalogHero
        categoryCount={Math.max(0, categories.length - 1)}
        productCount={products.length}
      />
      <CatalogToolbar
        categories={categories}
        onCategoryChange={setSelectedCategory}
        onSearchChange={updateSearch}
        searchValue={searchInput}
        selectedCategory={selectedCategory}
      />
      <RecentlyViewedStrip products={recentlyViewedProducts} />
      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              Catalog
            </h2>
            <p className="text-sm text-slate-600">
              React Query owns the server cache while filters stay in local UI
              state.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {filteredProducts.length} matching products
          </p>
        </div>
        {filteredProducts.length === 0 ? (
          <StatePanel>No products match the current filters.</StatePanel>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

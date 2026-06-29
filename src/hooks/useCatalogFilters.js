import { startTransition, useDeferredValue, useMemo, useState } from "react";

const ALL_CATEGORY = "All categories";

export function useCatalogFilters(products = []) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const deferredSearch = useDeferredValue(searchInput);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((product) => product.category));
    return [ALL_CATEGORY, ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORY ||
        product.category === selectedCategory;
      const searchableText =
        `${product.title} ${product.description}`.toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [deferredSearch, products, selectedCategory]);

  function updateSearch(nextValue) {
    startTransition(() => {
      setSearchInput(nextValue);
    });
  }

  return {
    categories,
    filteredProducts,
    searchInput,
    selectedCategory,
    updateSearch,
    setSelectedCategory,
  };
}

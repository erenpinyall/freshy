import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { SlidersHorizontal, XIcon } from "lucide-react";

import type { Product } from "../types";
import { categoriesData } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";
import api from "../config/api";
import { normalizeProducts } from "../utils/normalize";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (category) params.set("category", category);
        if (organic) params.set("organic", organic);
        if (sort) params.set("sort", sort);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);

        params.set("page", String(page));
        params.set("limit", "12");

        const res = await api.get(`/products?${params.toString()}`);

        const list = normalizeProducts(res.data);

        setProducts(list || []);
        setTotalPages(
          res.data?.pages ??
          res.data?.data?.pages ??
          1
        );
      } catch (err: any) {
        toast.error(err?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, organic, sort, page, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    if (key !== "page") newParams.delete("page");

    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});

  const activeCategory = categoriesData.find((c) => c.slug === category);

  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-app-green">
              {activeCategory ? activeCategory.name : "All Products"}
            </h1>

            <p className="text-sm text-gray-500">
              {products.length} products
            </p>
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">

          {/* SIDEBAR */}
          <aside className="hidden lg:block w-64">
            <FilterPanel
              categories={categoriesData}
              category={category}
              organic={organic}
              minPrice={minPrice}
              maxPrice={maxPrice}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
              hasFilters={!!(category || organic || minPrice || maxPrice)}
            />
          </aside>

          {/* MAIN */}
          <main className="flex-1">

            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p>No products found</p>

                <button onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}   // 🔥 CRITICAL FIX
                    product={product}
                  />
                ))}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* MOBILE FILTER */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 bg-white">
            <div className="p-4 flex justify-between">
              <h3>Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <XIcon />
              </button>
            </div>

            <FilterPanel
              categories={categoriesData}
              category={category}
              organic={organic}
              minPrice={minPrice}
              maxPrice={maxPrice}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
              hasFilters={!!(category || organic || minPrice || maxPrice)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import type { Product } from "../../types";
import ProductCard from "../ProductCard";
import api from "../../config/api";

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products?sort=rating");

        const data = res.data;

        // 🔥 GLOBAL SAFE NORMALIZATION
        const list = Array.isArray(data)
          ? data
          : data?.products ?? data?.data?.products ?? [];

        setProducts(list);
      } catch (error: unknown) {
        const message = isAxiosError(error)
          ? error.response?.data?.message ?? error.message
          : error instanceof Error
          ? error.message
          : "An error occurred";

        toast.error(message);
        setProducts([]); // 🔥 crash engelle
      }
    };

    fetchProducts();
  }, []);

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Popular Products</h2>
            <p className="text-sm text-app-text-light mt-1">
              Top-rated products this season
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1"
          >
            View All <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        {safeProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
            {safeProducts.slice(0, 10).map((product) => (
              <ProductCard
                key={product._id ?? product.product_id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-app-text-light">
            No popular products found
          </div>
        )}

      </div>
    </section>
  );
};

export default PopularProducts;
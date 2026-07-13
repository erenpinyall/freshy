import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  HomeIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { useCart } from "../context/useCart";
import type { Product } from "../types";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import api from "../config/api";
import { normalizeProducts } from "../utils/normalize";

const ProductPage = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);

    api
      .get(`/products/${id}`)
      .then(({ data }) => {
        const prod = data.product;

        setProduct(prod);

        return api.get(`/products?category=${prod.category}`);
      })
      .then(({ data }) => {
        const list = normalizeProducts(data);

        // 🔥 id FIX (backend id geliyor)
        setRelatedProducts(
          list.filter((p: Product) => p.id !== id)
        );
      })
      .catch(() => navigate("/products"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!product) return null;

  // 🔥 CART FIX
  const cartItem = items.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity;

  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1);
      } else {
        removeFromCart(product.id);
      }
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handlePlus = () => {
    if (inCart) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      setLocalQuantity(localQuantity + 1);
    }
  };

  const categoryLabel = product.category.replace(/-/g, " ");

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to="/" className="hover:text-app-green transition-colors">
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>

          <Link to="/products">Products</Link>

          <span>/</span>

          <span className="text-app-green font-medium truncate">
            {product.name}
          </span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1.5 text-sm text-app-text-light hover:text-app-green"
        >
          <ArrowLeftIcon className="size-4" /> Back
        </button>

        {/* PRODUCT */}
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">

            {/* IMAGE */}
            <div className="p-10 flex-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[360px] object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="p-6 md:p-10 flex flex-col justify-center">

              <span className="text-xs mb-2 capitalize">
                {categoryLabel}
              </span>

              <h1 className="text-2xl font-semibold mb-3">
                {product.name}
              </h1>

              {/* PRICE */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-semibold">
                  {currency}{product.price.toFixed(2)}
                </span>

                {product.originalPrice > product.price && (
                  <span className="line-through text-gray-400">
                    {currency}{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* STOCK */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-red-500">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* QTY */}
              <div className="flex items-center gap-3">
                <div className="flex border rounded-xl">
                  <button onClick={handleMinus} className="p-3">
                    <MinusIcon className="w-4 h-4" />
                  </button>

                  <span className="px-5 flex items-center">
                    {displayQuantity}
                  </span>

                  <button onClick={handlePlus} className="p-3">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() => {
                    if (!inCart) addToCart(product, localQuantity);
                  }}
                  disabled={product.stock === 0}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-xl"
                >
                  <ShoppingCartIcon className="w-4 h-4 inline" />
                  {inCart ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductPage;
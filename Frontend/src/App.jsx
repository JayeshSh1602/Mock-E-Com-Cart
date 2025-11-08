import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCart,
  addToCart,
  removeCartItem,
  checkout,
} from "./api";
import ProductsGrid from "./components/ProductsGrid";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [p, c] = await Promise.all([fetchProducts(), fetchCart()]);
        setProducts(p);
        setCart(c);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const reloadCart = async () => setCart(await fetchCart());

  const handleAdd = async (productId) => {
    await addToCart(productId, 1);
    reloadCart();
  };

  const handleRemove = async (id) => {
    await removeCartItem(id);
    reloadCart();
  };

  const handleCheckoutSubmit = async ({ name, email, cartItems }) => {
    const res = await checkout({ name, email, cartItems });
    setReceipt(res.receipt);
    reloadCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-100 text-foreground">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
            Vibe<span className="text-slate-700">Commerce</span>
          </h1>
          <p className="text-sm text-slate-500">Modern E-Com Demo</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="text-center text-muted-foreground text-lg mt-16">
            Loading products...
          </div>
        ) : (
          <ProductsGrid products={products} onAddToCart={handleAdd} />
        )}
      </main>

      <CartDrawer
        cart={cart}
        onRemove={handleRemove}
        onCheckoutOpen={() => setCheckoutOpen(true)}
      />

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => {
            setCheckoutOpen(false);
            setReceipt(null);
          }}
          onSubmit={handleCheckoutSubmit}
          receipt={receipt}
        />
      )}

      <footer className="text-center py-8 text-slate-500 text-sm">
        © {new Date().getFullYear()} VibeCommerce — All rights reserved.
      </footer>
    </div>
  );
}

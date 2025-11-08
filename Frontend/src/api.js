import axios from "axios";

export const fetchProducts = async () => {
  console.log("🧠 Calling /api/products...");
  const res = await axios.get("/api/products");
  console.log("📦 Response:", res.data);
  return res.data;
};

export const fetchCart = async () => {
  const res = await axios.get('/api/cart');
  return res.data;
};

export const addToCart = async (productId, qty) => {
  await axios.post('/api/cart', { productId, qty });
};

export const removeCartItem = async (id) => {
  await axios.delete(`/api/cart/${id}`);
};

export const checkout = async (data) => {
  const res = await axios.post('/api/checkout', data);
  return res.data;
};

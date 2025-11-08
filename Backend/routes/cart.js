import express from "express";
const router = express.Router();

let cart = [];

router.get("/", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

router.post("/", (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) {
    return res.status(400).json({ error: "productId and qty required" });
  }

  const products = [
    { id: "p1", name: "Wireless Headphones", price: 59.99 },
    { id: "p2", name: "Smart Watch", price: 79.99 },
    { id: "p3", name: "Bluetooth Speaker", price: 45 },
    { id: "p4", name: "Mechanical Keyboard", price: 69 },
    { id: "p5", name: "Wireless Mouse", price: 25.5 },
  ];

  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = cart.find(i => i.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: Date.now().toString(), ...product, productId, qty });

  res.json({ success: true, cart });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter(i => i.id !== id);
  res.json({ success: true, cart });
});

export default router;

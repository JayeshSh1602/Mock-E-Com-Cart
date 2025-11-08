import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import checkoutRouter from "./routes/checkout.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

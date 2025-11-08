import express from 'express';
import { db } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, cartItems } = req.body;
  if (!name || !email || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'name, email and cartItems required' });
  }

  const placeholders = cartItems.map(() => '?').join(',');
  const productIds = cartItems.map(ci => ci.productId);
  if (productIds.length === 0) {
    return res.status(400).json({ error: 'cart is empty' });
  }

  db.all(`SELECT id, price, name FROM products WHERE id IN (${placeholders})`, productIds, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const priceMap = Object.fromEntries(rows.map(r => [r.id, r.price]));
    let total = 0;
    cartItems.forEach(ci => {
      const price = priceMap[ci.productId] ?? 0;
      total += price * ci.qty;
    });

    const receiptId = uuidv4();
    const timestamp = Date.now();
    const itemsJson = JSON.stringify(cartItems);
    db.run('INSERT INTO receipts (id, items, total, name, email, timestamp) VALUES (?, ?, ?, ?, ?, ?)', [receiptId, itemsJson, total, name, email, timestamp], function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.run('DELETE FROM cart', [], (err) => {
        if (err) console.error('Failed to clear cart', err);
        res.json({
          receipt: {
            id: receiptId,
            name,
            email,
            items: cartItems,
            total,
            timestamp
          }
        });
      });
    });
  });
});

export default router;

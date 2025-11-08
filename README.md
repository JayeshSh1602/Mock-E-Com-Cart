🛒 Mock E-Commerce Cart – Vibe Commerce Internship Assignment
🌟 Overview

This is a React-based shopping cart component built as part of the Vibe Commerce internship screening.

Tech Stack:

Frontend: React.js ⚛️

Backend: Node.js + Express ⚡

Database: MongoDB / SQLite 💾 (optional)

APIs: RESTful 🌐

The app focuses solely on the cart functionality, including adding, updating, removing items, and calculating totals.

🛠 Features
🛒 Cart Component

➕ Add items to cart (mock products)

🔄 Update item quantities

❌ Remove items from cart

💰 View cart total dynamically

⚠️ Handles simple error cases

🔗 Backend APIs
Endpoint	Method	Description
/api/cart	GET	Get current cart and total 🧾
/api/cart	POST	Add { productId, qty } to cart ➕
/api/cart/:id	DELETE	Remove item from cart ❌

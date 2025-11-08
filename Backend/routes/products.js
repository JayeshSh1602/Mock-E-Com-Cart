import express from "express";
const router = express.Router();

export const products = [
  { 
    id: "p1", 
    name: "Wireless Headphones", 
    price: 59.99, 
    image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/425.png?v=1645772065" 
  },
  { 
    id: "p2", 
    name: "Smart Watch", 
    price: 79.99, 
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/17/Ox5h9V8B_4eef5884885342bb8dee5b2be9108756.jpg" 
  },
  { 
    id: "p3", 
    name: "Bluetooth Speaker", 
    price: 45, 
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/31505306/2024/11/15/02222972-787a-4be1-8836-6275b11625391731675273812-Blaupunkt-Atomik-Grab-20-W-Wireless-Bluetooth-PA-Speaker-386-1.jpg" 
  },
  { 
    id: "p4", 
    name: "Mechanical Keyboard", 
    price: 69, 
    image: "https://media.wired.com/photos/65b0438c22aa647640de5c75/4:3/w_2400,h_1800,c_limit/Mechanical-Keyboard-Guide-Gear-GettyImages-1313504623.jpg" 
  },
  { 
    id: "p5", 
    name: "Wireless Mouse", 
    price: 25.5, 
    image: "https://zebronics.com/cdn/shop/products/zeb-dashplus-pic2.jpg?v=1618045825&width=2048" 
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

export default router;

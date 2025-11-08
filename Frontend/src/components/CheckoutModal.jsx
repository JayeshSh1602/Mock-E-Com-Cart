import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Plus, Minus } from "lucide-react";

const CheckoutModal = ({ cart, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Initialize cartItems from parent cart
  useEffect(() => {
    setCartItems(
      cart?.items?.map((item) => ({
        ...item,
        price: item.price || item.product?.price || 0,
        quantity: item.quantity || 1,
      })) || []
    );
  }, [cart]);

  const increaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updated);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // Fake API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate fake receipt
      const newReceipt = {
        orderId: "ORDER-" + Math.floor(Math.random() * 100000),
        total: calculateTotal(),
        items: cartItems,
      };
      setReceipt(newReceipt);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Order submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Receipt view
  if (receipt) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-foreground">
              Order Confirmed! 🎉
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Thank you for your order!
              </h3>
              <p className="text-muted-foreground text-center">
                Your order has been placed successfully.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono font-semibold text-foreground">{receipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-lg text-primary">${receipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Items:</h4>
              {receipt.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm py-2 border-b border-border last:border-0"
                >
                  <span className="text-foreground">{item.name} ×{item.quantity}</span>
                  <span className="font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Button onClick={onClose} className="w-full" size="lg">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Checkout form view
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">Checkout</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm py-1 border-b border-border last:border-0"
              >
                <span className="text-foreground">{item.name}</span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="font-semibold text-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between text-lg mt-2">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="font-bold text-primary">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-accent hover:opacity-90"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;

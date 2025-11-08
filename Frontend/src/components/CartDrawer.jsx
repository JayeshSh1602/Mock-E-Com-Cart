import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CartDrawer = ({ cart, onRemove, onCheckoutOpen }) => {
  const itemCount = cart?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-strong bg-gradient-accent hover:opacity-90 transition-all hover:scale-110"
        >
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {!cart?.items?.length ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-lg text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Add some products to get started!</p>
            </div>
          ) : (
            cart.items.map((item) => {
              const p = item.product || item;
              const name = p?.name || "Unnamed Product";
              const price = p?.price || 0;
              const img = p?.image;

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-shadow"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-muted text-muted-foreground rounded-md text-sm">
                      No Image
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Qty: {item.quantity || 1}
                    </p>
                    <p className="text-lg font-bold text-primary mt-1">
                      ${(price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })
          )}
        </div>

        {cart?.items?.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="font-bold text-2xl text-primary">
                ${cart.total?.toFixed(2) || "0.00"}
              </span>
            </div>
            <Button
              onClick={onCheckoutOpen}
              size="lg"
              className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

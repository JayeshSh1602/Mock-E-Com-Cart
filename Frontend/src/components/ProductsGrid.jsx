import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react"; 

const ProductsGrid = ({ products, onAddToCart, cartItemIds = [] }) => {
  const [addStatus, setAddStatus] = useState(null); 

  const handleAdd = (product) => {
    onAddToCart(product.id);

    setAddStatus(product.id);

    setTimeout(() => {
      setAddStatus(null);
    }, 1500); 
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {products.map((product) => {
        const isAdded = cartItemIds.includes(product.id);
        const isConfirming = addStatus === product.id; 

        return (
          <Card
            key={product.id}
            className="group overflow-hidden border border-slate-200 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg text-foreground mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-3">
                {product.description || "High-quality product you’ll love."}
              </p>
              <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button
                onClick={() => handleAdd(product)}
                className="w-full transition-all duration-300"
                variant={isConfirming ? "success" : "default"} 
                size="lg"
              >
                {isConfirming ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isAdded ? "Add One More" : "Add to Cart"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
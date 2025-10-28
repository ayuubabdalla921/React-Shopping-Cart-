import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { addToCart } = useCart();

  const product = useMemo(
    () => products.find((item) => item.id === productId),
    [productId]
  );

  if (!product) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <p className="text-muted-foreground">
          The item you&apos;re looking for has moved or no longer exists. Explore our catalog to keep shopping.
        </p>
        <Button asChild variant="outline">
          <Link to="/products">Back to products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 lg:flex-row">
      <div className="flex-1">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <Button
          variant="ghost"
          className="gap-2 px-0 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Button>
        <div className="space-y-3">
          {product.badge && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {product.badge}
            </span>
          )}
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          <p className="text-base text-muted-foreground">{product.description}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-3xl font-semibold">{formatCurrency(product.price)}</div>
          <div className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
            {product.rating.toFixed(1)} rating
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Why you&apos;ll love it
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="rounded-md border border-dashed border-muted bg-muted/40 px-3 py-2"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => addToCart(product)} className="gap-2">
            <ShoppingCart className="h-4 w-4" aria-hidden />
            Add to cart
          </Button>
          <Button onClick={handleAddToCart} variant="outline" className="gap-2">
            <ShoppingCart className="h-4 w-4" aria-hidden />
            Add & view cart
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Need more options?{" "}
          <Link to="/products" className="font-medium text-primary underline-offset-4 hover:underline">
            Browse the full catalog.
          </Link>
        </p>
      </div>
    </div>
  );
}

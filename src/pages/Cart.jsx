import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const { items, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShoppingBasket className="h-8 w-8" aria-hidden />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold sm:text-4xl">Your cart is empty</h1>
          <p className="text-balance text-muted-foreground">
            Add products to your cart and return here to review them before checkout.
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2">
          <Link to="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Review your cart</h1>
            <p className="text-sm text-muted-foreground">Adjust quantities or remove items before checkout.</p>
          </div>
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-destructive"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Clear all
          </Button>
        </header>
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="space-y-1">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-base font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatCurrency(product.price)} each
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:w-auto sm:justify-end">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    <Minus className="h-4 w-4" aria-hidden />
                  </Button>
                  <span className="min-w-[2ch] text-center text-base font-medium">{quantity}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(product.price * quantity)}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-sm text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className="h-fit space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <p className="text-sm text-muted-foreground">
            {cartCount} item{cartCount === 1 ? "" : "s"} in your bag.
          </p>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium">{formatCurrency(cartTotal)}</dd>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <dt>Shipping</dt>
            <dd>Calculated at checkout</dd>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <dt>Taxes</dt>
            <dd>Estimated at checkout</dd>
          </div>
          <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
            <dt>Total due</dt>
            <dd>{formatCurrency(cartTotal)}</dd>
          </div>
        </dl>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/products">Continue shopping</Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}

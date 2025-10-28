import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/format";

export default function CheckoutPage() {
  const { items, cartTotal, cartCount, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center">
        <Shield className="h-12 w-12 text-primary" aria-hidden />
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold sm:text-4xl">No items to checkout</h1>
          <p className="text-muted-foreground">
            Add a few products to your cart before completing your purchase.
          </p>
        </div>
        <Button asChild>
          <Link to="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-primary" aria-hidden />
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold sm:text-4xl">Order confirmed</h1>
          <p className="text-muted-foreground">
            A confirmation email is on its way. Keep exploring to discover more gear.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/products">Continue shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 lg:grid-cols-[3fr_2fr]">
      <section className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Checkout
          </p>
          <h1 className="text-3xl font-semibold">Shipping details</h1>
          <p className="text-sm text-muted-foreground">
            This is a demo flow. Replace these placeholder fields with your form implementation.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              placeholder="Jane"
              className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              placeholder="Doe"
              className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              placeholder="123 Market Street"
              className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="city">
              City
            </label>
            <input
              id="city"
              placeholder="San Francisco"
              className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="postal">
              Postal code
            </label>
            <input
              id="postal"
              placeholder="94107"
              className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
        <div className="rounded-lg border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
          Payment integrations go here. For now, this demo places the order instantly.
        </div>
      </section>
      <aside className="h-fit space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <p className="text-sm text-muted-foreground">
            {cartCount} item{cartCount === 1 ? "" : "s"} ready to ship.
          </p>
        </div>
        <div className="space-y-4">
          <ul className="space-y-3 text-sm">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-muted-foreground">
                    {quantity} x {formatCurrency(product.price)}
                  </p>
                </div>
                <p className="font-semibold text-foreground">
                  {formatCurrency(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium">{formatCurrency(cartTotal)}</dd>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <dt>Shipping</dt>
              <dd>Free over $100</dd>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <dt>Estimated tax</dt>
              <dd>Calculated at payment</dd>
            </div>
            <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
              <dt>Total due</dt>
              <dd>{formatCurrency(cartTotal)}</dd>
            </div>
          </dl>
        </div>
        <Button onClick={handlePlaceOrder} className="w-full">
          Place order
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to="/cart">Return to cart</Link>
        </Button>
      </aside>
    </div>
  );
}

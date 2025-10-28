import { Link, NavLink, Route, Routes } from "react-router-dom";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartProvider, useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import HomePage from "@/pages/Home";
import ProductsPage from "@/pages/Products";
import ProductDetailPage from "@/pages/ProductDetail";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" }
];

function CartNavButton() {
  const { cartCount } = useCart();

  return (
    <Button asChild size="sm" className="relative gap-2">
      <NavLink to="/cart">
        <CircleUserRound className="h-4 w-4" aria-hidden />
        Cart
        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {cartCount}
          </span>
        )}
      </NavLink>
    </Button>
  );
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-6 w-6" aria-hidden />
            Shop Cart
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <CartNavButton />
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-muted-foreground">
          Ready-made demo by Ayuub - {new Date().getFullYear()}.
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Layout />
    </CartProvider>
  );
}

export default App;

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, SlidersHorizontal, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

const categories = ["All", ...new Set(products.map((product) => product.category))];
const maxPrice = Math.max(...products.map((product) => product.price));

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState(maxPrice);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery =
        query.trim().length === 0 ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const withinPrice = product.price <= priceFilter;

      return matchesQuery && matchesCategory && withinPrice;
    });
  }, [query, selectedCategory, priceFilter]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-4 text-center sm:text-left">
        <p className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground sm:justify-start">
          <Filter className="h-4 w-4" aria-hidden />
          Catalog
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Find the right gear for every session.
            </h1>
            <p className="text-muted-foreground">
              Filter by category, search by name, and jump into the details to add items to your cart.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Refine products
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium text-muted-foreground">
            Search
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-muted-foreground">
            Category
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-muted-foreground">
            Price up to
            <div className="rounded-md border border-input bg-background px-3 py-2 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <span>{formatCurrency(priceFilter)}</span>
                <span className="text-muted-foreground">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceFilter}
                onChange={(event) => setPriceFilter(Number(event.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
          </label>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed bg-muted/30 p-10 text-center text-muted-foreground">
            No products match your filters yet. Try broadening your search terms.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link to={`/products/${product.id}`} className="relative block overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow">
                    {product.badge}
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{product.name}</h2>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="text-base font-medium text-foreground">{formatCurrency(product.price)}</p>
                </div>
                <p className="flex-1 text-sm text-muted-foreground">{product.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
                    {product.rating.toFixed(1)}
                  </span>
                  <Link to={`/products/${product.id}`} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                    View details
                  </Link>
                </div>
                <Button onClick={() => addToCart(product)} className="gap-2">
                  <ShoppingCart className="h-4 w-4" aria-hidden />
                  Add to cart
                </Button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

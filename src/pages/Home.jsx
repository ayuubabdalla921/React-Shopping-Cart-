import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers3,
  ShoppingCart,
  Sparkles,
  ShieldCheck,
  PackageSearch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

const highlights = [
  {
    title: "Unified workflow",
    description:
      "React Router coordinates every screen while Tailwind CSS keeps layout decisions flexible.",
    icon: Sparkles
  },
  {
    title: "Composable UI",
    description:
      "shadcn/ui primitives and the cn utility make it easy to stay consistent as you scale.",
    icon: ShieldCheck
  },
  {
    title: "Product ready data",
    description:
      "Filter, inspect details, add to cart, and glide through checkout with a shared data layer.",
    icon: PackageSearch
  }
];

const steps = [
  { label: "Browse curated products", detail: "Use the filters and quick detail views to compare items in seconds." },
  { label: "Add to cart anywhere", detail: "The cart badge follows you across routes with live counts and totals." },
  { label: "Complete the flow", detail: "Head to checkout for a lightweight example form and confirmation state." }
];

export default function HomePage() {
  const { cartCount } = useCart();
  const latestProducts = useMemo(() => products.slice(0, 5), []);
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 shadow-sm md:px-12">
        {/* background mesh */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(1200px 600px at -10% 0%, rgba(99,102,241,.16), transparent 60%), radial-gradient(900px 500px at 110% 100%, rgba(56,189,248,.14), transparent 60%)"
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <Layers3 className="h-4 w-4" aria-hidden />
            Demo Kit
          </span>

          <h1 className="mt-4 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            Build a shopping journey without leaving your starter repo.
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">
            Explore the catalog, open detail routes, add items to a shared cart, and finish with a guided checkout.
            Everything is wired up with modern React tooling and ready for your data.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="gap-2">
              <Link to="/products">
                Browse products
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/checkout">
                Go to checkout
                <ShoppingCart className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Cart status:
            <span className="ml-1 font-medium text-foreground">
              {cartCount} item{cartCount === 1 ? "" : "s"} ready.
            </span>
          </p>
        </div>

        {/* soft ring frame */}
        <div className="pointer-events-none absolute inset-3 -z-10 rounded-2xl ring-1 ring-primary/20" />
      </section>

      {/* LATEST PRODUCTS */}
      <section className="mt-14 space-y-6 rounded-3xl border bg-card px-4 py-8 shadow-sm sm:px-6 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Latest products
            </p>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Fresh arrivals to explore</h2>
            <p className="text-sm text-muted-foreground">
              Preview the newest additions and jump into their product pages without leaving the home screen.
            </p>
          </div>

          <div className="hidden gap-2 md:flex">
            <Button type="button" variant="outline" size="icon" onClick={() => scrollSlider(-1)} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={() => scrollSlider(1)} aria-label="Next">
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* mobile overlay arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-card to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-card to-transparent md:block" />

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            aria-label="Latest products slider"
          >
            {latestProducts.map((product) => (
              <article
                key={product.id}
                className="group relative flex min-w-[240px] flex-1 snap-start flex-col overflow-hidden rounded-2xl border bg-background/70 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:min-w-[280px] lg:min-w-[320px]"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow">
                      {product.badge}
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>

                  <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-base font-semibold text-foreground">{formatCurrency(product.price)}</span>
                    <Button asChild variant="ghost" className="gap-1 px-0 text-sm font-semibold text-primary">
                      <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
                        View
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* floating arrows for all screens */}
          <div className="pointer-events-none absolute inset-y-0 left-2 right-2 flex items-center justify-between md:hidden">
            <button
              type="button"
              onClick={() => scrollSlider(-1)}
              aria-label="Scroll left"
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 shadow backdrop-blur transition active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider(1)}
              aria-label="Scroll right"
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 shadow backdrop-blur transition active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {highlights.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="flex h-full flex-col gap-4 rounded-2xl border bg-muted/20 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </article>
        ))}
      </section>

      {/* STEPS */}
      <section className="mt-14 grid gap-10 rounded-3xl border bg-card px-6 py-10 shadow-sm md:grid-cols-[2fr_3fr] md:px-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">How to get started</h2>
          <p className="text-sm text-muted-foreground">
            The demo mirrors the core screens you need: catalog, details, cart, and checkout. Replace the product data
            and styling tokens to tailor it to your brand.
          </p>
        </div>
        <ol className="space-y-4">
          {steps.map(({ label, detail }, index) => (
            <li key={label} className="flex gap-4 rounded-2xl border border-dashed border-muted bg-muted/20 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <div className="space-y-2 text-left">
                <h3 className="text-base font-semibold text-foreground">{label}</h3>
                <p className="text-sm text-muted-foreground">{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

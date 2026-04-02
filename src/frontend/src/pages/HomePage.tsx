import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { PhoneNumber, backendInterface } from "../backend.d.ts";
import { NumberCard } from "../components/NumberCard";
import { createActorWithConfig } from "../config";

const US_STATES = [
  "All States",
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Georgia",
  "North Carolina",
  "Michigan",
  "New Jersey",
  "Virginia",
  "Washington",
  "Arizona",
  "Massachusetts",
  "Tennessee",
  "Indiana",
  "Missouri",
  "Maryland",
  "Wisconsin",
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

interface HomePageProps {
  onViewNumber: (number: string) => void;
}

export function HomePage({ onViewNumber }: HomePageProps) {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All States");

  useEffect(() => {
    const load = async () => {
      try {
        const actor: backendInterface = await createActorWithConfig();
        const data = await actor.getAllPhoneNumbers();
        setNumbers(data);
      } catch (e) {
        console.error("Failed to load phone numbers", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = numbers.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.number.includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q);
    const matchState =
      selectedState === "All States" || p.state === selectedState;
    return matchSearch && matchState;
  });

  // Hero mini cards: show first 3 numbers
  const heroCards = numbers.slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(0.58 0.2 252 / 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: headline + CTA + phone image */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-medium text-muted-foreground w-fit">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "oklch(var(--success))" }}
                />
                100% Free · No Registration Required
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight text-foreground">
                Receive SMS Online —{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.2 252), oklch(0.75 0.15 210))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Free Temporary US Numbers
                </span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Get instant access to real American phone numbers. Receive OTP
                codes, verify accounts, and protect your privacy — no sign-up
                needed.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 font-bold btn-blue-glow"
                  onClick={() =>
                    document
                      .getElementById("numbers-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-ocid="hero.get_free_number.button"
                >
                  Get Your Free Number Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Phone illustration */}
              <div className="flex justify-center md:justify-start mt-4">
                <img
                  src="/assets/generated/hero-phone-sms-transparent.dim_400x500.png"
                  alt="SMS on smartphone illustration"
                  className="w-56 md:w-72 object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 8px 32px oklch(0.58 0.2 252 / 0.3))",
                  }}
                />
              </div>
            </div>

            {/* Right: mini number cards */}
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Featured Numbers
              </p>
              {loading ? (
                <div className="grid grid-cols-1 gap-3">
                  {["h1", "h2", "h3"].map((k) => (
                    <Skeleton key={k} className="h-28 rounded-xl" />
                  ))}
                </div>
              ) : heroCards.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {heroCards.map((phone, i) => (
                    <NumberCard
                      key={phone.number}
                      phone={phone}
                      onView={onViewNumber}
                      index={i}
                      compact
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-6 text-center text-muted-foreground text-sm">
                  Loading numbers…
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers section */}
      <section id="numbers-section" className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Available Free US Phone Numbers
            </h2>
            <p className="text-sm text-muted-foreground">
              Click any number to instantly view incoming SMS messages and OTP
              codes.
            </p>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 bg-secondary border-border rounded-xl placeholder:text-muted-foreground"
                placeholder="Search by number, city, or state…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="numbers.search_input"
              />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-secondary border border-border text-foreground text-sm rounded-xl px-4 py-2 pr-9 h-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                data-ocid="numbers.state.select"
              >
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              data-ocid="numbers.loading_state"
            >
              {SKELETON_KEYS.map((k) => (
                <Skeleton key={k} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center gap-3 py-16 text-center"
              data-ocid="numbers.empty_state"
            >
              <span className="text-4xl">📭</span>
              <p className="text-muted-foreground">
                {search || selectedState !== "All States"
                  ? "No numbers match your search. Try different filters."
                  : "No phone numbers available yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((phone, i) => (
                <NumberCard
                  key={phone.number}
                  phone={phone}
                  onView={onViewNumber}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-display font-bold text-foreground">
                How It Works
              </h2>
              <p className="text-sm text-muted-foreground">
                Three simple steps to receive SMS messages instantly.
              </p>
            </div>

            <div
              className="flex flex-col md:flex-row items-stretch gap-0 rounded-2xl border border-border overflow-hidden"
              style={{ background: "oklch(0.145 0.012 240)" }}
            >
              {[
                {
                  step: "01",
                  icon: "📱",
                  title: "Browse Numbers",
                  desc: "Choose from dozens of free US phone numbers across different states and cities.",
                },
                {
                  step: "02",
                  icon: "👆",
                  title: "Click a Number",
                  desc: "Select any number to view its inbox. Use it for sign-ups, verifications, or OTPs.",
                },
                {
                  step: "03",
                  icon: "✉️",
                  title: "Read OTP / SMS",
                  desc: "Messages arrive in real-time. OTP codes are auto-detected and highlighted for quick copy.",
                },
              ].map(({ step, icon, title, desc }, i) => (
                <div key={step} className="flex-1 relative">
                  {i > 0 && (
                    <div
                      className="hidden md:flex absolute -left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full items-center justify-center"
                      style={{
                        background: "oklch(var(--card))",
                        border: "1px solid oklch(var(--border))",
                      }}
                    >
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col gap-3 h-full">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{icon}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          color: "oklch(0.68 0.2 252)",
                          background: "oklch(0.22 0.06 252)",
                        }}
                      >
                        Step {step}
                      </span>
                    </div>
                    <h3 className="text-base font-display font-bold text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute right-0 top-4 bottom-4 w-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

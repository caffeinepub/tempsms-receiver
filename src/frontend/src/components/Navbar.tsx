import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateNumbers: () => void;
}

export function Navbar({ onNavigateHome, onNavigateNumbers }: NavbarProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border"
      style={{
        background: "oklch(0.1 0.012 240 / 0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          onClick={onNavigateHome}
          data-ocid="nav.home.link"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            TempSMS
          </span>
        </button>

        {/* Nav links */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Main navigation"
        >
          <button
            type="button"
            onClick={onNavigateHome}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.home_link"
          >
            Home
          </button>
          <button
            type="button"
            onClick={onNavigateNumbers}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.numbers_link"
          >
            Free US Numbers
          </button>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.howitworks_link"
          >
            How It Works
          </a>
        </nav>

        {/* CTA */}
        <Button
          onClick={onNavigateNumbers}
          className="btn-blue-glow rounded-full px-5 text-sm font-semibold"
          data-ocid="nav.get_free_number.button"
        >
          Get Free Number
        </Button>
      </div>
    </header>
  );
}

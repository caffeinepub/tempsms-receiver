import { MessageSquare } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateNumbers: () => void;
}

export function Footer({ onNavigateHome, onNavigateNumbers }: FooterProps) {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="border-t border-border"
      style={{ background: "oklch(0.1 0.012 240)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">
                TempSMS
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Free temporary US phone numbers for SMS verification. Protect your
              privacy online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="footer.home.link"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateNumbers}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="footer.numbers.link"
                >
                  Free US Numbers
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="footer.howitworks.link"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
              FAQ
            </p>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">
                Are numbers really free?
              </li>
              <li className="text-sm text-muted-foreground">
                How long do numbers last?
              </li>
              <li className="text-sm text-muted-foreground">Can I send SMS?</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter/X"
            >
              <SiX className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <SiGithub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

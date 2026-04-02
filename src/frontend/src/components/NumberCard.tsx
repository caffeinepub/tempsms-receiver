import { Button } from "@/components/ui/button";
import { Clock, Eye, MessageCircle } from "lucide-react";
import type { PhoneNumber } from "../backend.d.ts";
import { relativeTime } from "../utils/time";

interface NumberCardProps {
  phone: PhoneNumber;
  onView: (number: string) => void;
  index: number;
  compact?: boolean;
}

export function NumberCard({
  phone,
  onView,
  index,
  compact = false,
}: NumberCardProps) {
  // Fake "last SMS" time for demo — in production this would come from backend
  const fakeLastSmsOffset = (index * 137 + 42) % 600; // 0-600 seconds ago
  const fakeNanoTs = BigInt(Date.now() - fakeLastSmsOffset * 1000) * 1_000_000n;
  const lastSms = relativeTime(fakeNanoTs);

  if (compact) {
    return (
      <div
        className="number-card bg-card border border-border rounded-xl p-4 flex flex-col gap-2"
        data-ocid={`numbers.item.${index + 1}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg">🇺🇸</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: "oklch(var(--success))",
              background: "oklch(var(--success-bg))",
            }}
          >
            Active
          </span>
        </div>
        <p className="text-sm font-bold text-foreground font-display">
          {phone.number}
        </p>
        <p className="text-xs text-muted-foreground">
          {phone.city}, {phone.state}
        </p>
        <Button
          size="sm"
          className="w-full mt-1 text-xs rounded-lg btn-blue-glow"
          onClick={() => onView(phone.number)}
          data-ocid={`numbers.view_messages.button.${index + 1}`}
        >
          <Eye className="w-3 h-3 mr-1" /> View Messages
        </Button>
      </div>
    );
  }

  return (
    <div
      className="number-card bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
      data-ocid={`numbers.item.${index + 1}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇺🇸</span>
          <div>
            <p className="text-base font-bold text-foreground font-display leading-none">
              {phone.number}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {phone.city}, {phone.state}
            </p>
          </div>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            color: "oklch(var(--success))",
            background: "oklch(var(--success-bg))",
          }}
        >
          Active
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          {Number(phone.messageCount)} msgs
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {lastSms}
        </span>
      </div>

      <div className="h-px bg-border" />

      <Button
        className="w-full rounded-lg btn-blue-glow"
        onClick={() => onView(phone.number)}
        data-ocid={`numbers.view_messages.button.${index + 1}`}
      >
        <Eye className="w-4 h-4 mr-2" /> View Messages
      </Button>
    </div>
  );
}

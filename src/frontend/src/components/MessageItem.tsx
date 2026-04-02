import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SMSMessage } from "../backend.d.ts";
import { extractOTP } from "../utils/otp";
import { formatDate, relativeTime } from "../utils/time";

interface MessageItemProps {
  message: SMSMessage;
  index: number;
}

export function MessageItem({ message, index }: MessageItemProps) {
  const [copiedOtp, setCopiedOtp] = useState<string | null>(null);
  const otp = extractOTP(message.messageBody);
  const timeStr = relativeTime(message.receivedTimestamp);
  const fullDate = formatDate(message.receivedTimestamp);

  const copyOtp = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedOtp(code);
    toast.success(`OTP ${code} copied to clipboard!`);
    setTimeout(() => setCopiedOtp(null), 2000);
  };

  // Mask sender number: show last 4 digits
  const maskedSender =
    message.senderNumber.replace(
      /(\+?\d{1,3})[- ]?(\d{3})[- ]?(\d{3})[- ]?(\d{4})/,
      "+1-***-***-$4",
    ) || message.senderNumber;

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 animate-fade-in"
      data-ocid={`messages.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">
            {maskedSender}
          </span>
          <span className="text-xs text-muted-foreground" title={fullDate}>
            {timeStr}
          </span>
        </div>
        {otp.hasOtp && (
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {otp.codes.map((code) => (
              <button
                type="button"
                key={code}
                onClick={() => copyOtp(code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: "oklch(0.25 0.12 252)",
                  color: "oklch(0.75 0.2 252)",
                  border: "1px solid oklch(0.58 0.2 252 / 0.4)",
                }}
                data-ocid={`messages.copy_otp.button.${index + 1}`}
              >
                {copiedOtp === code ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                OTP: {code}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-foreground leading-relaxed">
        {otp.highlightedParts.map((part) =>
          part.isOtp ? (
            <mark
              key={`otp-${part.text}`}
              className="font-bold rounded px-0.5"
              style={{
                background: "oklch(0.25 0.12 252)",
                color: "oklch(0.82 0.18 252)",
              }}
            >
              {part.text}
            </mark>
          ) : (
            <span key={`txt-${part.text}`}>{part.text}</span>
          ),
        )}
      </div>
    </div>
  );
}

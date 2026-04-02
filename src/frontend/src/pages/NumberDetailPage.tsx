import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Check, Copy, MessageSquare, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { SMSMessage, backendInterface } from "../backend.d.ts";
import { MessageItem } from "../components/MessageItem";
import { createActorWithConfig } from "../config";

interface NumberDetailPageProps {
  number: string;
  onBack: () => void;
}

const REFRESH_INTERVAL_MS = 30_000;

export function NumberDetailPage({ number, onBack }: NumberDetailPageProps) {
  const [messages, setMessages] = useState<SMSMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL_MS / 1000);

  const loadMessages = useCallback(
    async (showRefreshing = false) => {
      if (showRefreshing) setRefreshing(true);
      try {
        const actor: backendInterface = await createActorWithConfig();
        const data = await actor.getMessagesForNumber(number);
        // Sort newest first by receivedTimestamp
        const sorted = [...data].sort((a, b) =>
          Number(b.receivedTimestamp - a.receivedTimestamp),
        );
        setMessages(sorted);
        setCountdown(REFRESH_INTERVAL_MS / 1000);
      } catch (e) {
        console.error("Failed to load messages", e);
      } finally {
        setLoading(false);
        if (showRefreshing) setRefreshing(false);
      }
    },
    [number],
  );

  // Initial load
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Auto-refresh every 30s
  useEffect(() => {
    const interval = setInterval(() => loadMessages(true), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadMessages]);

  // Countdown ticker — runs independently
  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown((prev) =>
        prev <= 1 ? REFRESH_INTERVAL_MS / 1000 : prev - 1,
      );
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const copyNumber = async () => {
    await navigator.clipboard.writeText(number);
    setCopied(true);
    toast.success("Number copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          onClick={onBack}
          data-ocid="detail.back.button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to numbers
        </button>

        {/* Header */}
        <div
          className="rounded-2xl border border-border p-6 md:p-8 mb-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between"
          style={{ background: "oklch(0.145 0.012 240)" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "oklch(0.22 0.06 252)" }}
            >
              🇺🇸
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                US Phone Number
              </p>
              <h1 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
                {number}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    color: "oklch(var(--success))",
                    background: "oklch(var(--success-bg))",
                  }}
                >
                  ● Active
                </span>
                <span className="text-xs text-muted-foreground">
                  {messages.length} messages received
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-xl gap-2"
              onClick={copyNumber}
              data-ocid="detail.copy_number.button"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy Number"}
            </Button>
            <Button
              variant="outline"
              className="rounded-xl gap-2"
              onClick={() => loadMessages(true)}
              disabled={refreshing}
              data-ocid="detail.refresh.button"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Auto-refresh banner */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 px-1">
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            Auto-refreshing every 30s
          </span>
          <span>Next refresh in {countdown}s</span>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-base font-display font-semibold text-foreground">
              Inbox
            </h2>
          </div>
        </div>

        {loading ? (
          <div
            className="flex flex-col gap-3"
            data-ocid="messages.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div
            className="flex flex-col items-center gap-4 py-20 text-center"
            data-ocid="messages.empty_state"
          >
            <span className="text-5xl">📭</span>
            <div>
              <p className="text-foreground font-semibold mb-1">
                No messages yet
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Messages sent to {number} will appear here automatically. The
                inbox refreshes every 30 seconds.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-xl gap-2 mt-2"
              onClick={copyNumber}
              data-ocid="messages.copy_number_cta.button"
            >
              <Copy className="w-4 h-4" /> Copy Number to Use
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => (
              <MessageItem
                key={`${msg.receivedTimestamp}-${i}`}
                message={msg}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/**
 * Convert nanosecond bigint timestamp to relative time string.
 */
export function relativeTime(nanoTs: bigint): string {
  const ms = Number(nanoTs / 1_000_000n);
  const now = Date.now();
  const diffMs = now - ms;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  return `${diffDay}d ago`;
}

/**
 * Format nanosecond timestamp as human-readable date.
 */
export function formatDate(nanoTs: bigint): string {
  const ms = Number(nanoTs / 1_000_000n);
  return new Date(ms).toLocaleString();
}

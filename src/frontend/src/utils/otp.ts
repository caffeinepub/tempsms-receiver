const OTP_REGEX = /\b\d{4,8}\b/;

export interface OTPResult {
  hasOtp: boolean;
  codes: string[];
  highlightedParts: Array<{ text: string; isOtp: boolean }>;
}

export function extractOTP(messageBody: string): OTPResult {
  const codes: string[] = [];
  const parts: Array<{ text: string; isOtp: boolean }> = [];
  let lastIndex = 0;

  const regex = new RegExp(OTP_REGEX.source, "g");
  let match = regex.exec(messageBody);

  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: messageBody.slice(lastIndex, match.index),
        isOtp: false,
      });
    }
    parts.push({ text: match[0], isOtp: true });
    codes.push(match[0]);
    lastIndex = regex.lastIndex;
    match = regex.exec(messageBody);
  }

  if (lastIndex < messageBody.length) {
    parts.push({ text: messageBody.slice(lastIndex), isOtp: false });
  }

  return {
    hasOtp: codes.length > 0,
    codes,
    highlightedParts:
      parts.length > 0 ? parts : [{ text: messageBody, isOtp: false }],
  };
}

# TempSMS Receiver

## Current State
New project with empty backend and no frontend UI.

## Requested Changes (Diff)

### Add
- A list of virtual US phone numbers (e.g. 10+ sample numbers across different US states)
- Each number shows: phone number, state, status (Active), message count, last SMS time
- Clicking a number opens a detail page/view showing all received SMS messages for that number
- Messages include sender, message body (often OTP codes), and received timestamp
- Search/filter numbers by state or city
- "How It Works" section explaining the 3-step process
- Hero section with CTA button
- Navigation bar with links
- Footer
- Numbers show "0 new" or usage count
- OTP messages are highlighted/detected automatically in the message body

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: Store phone numbers with metadata (number, state, city, status, message count). Store messages per number (sender, body, timestamp). Seed with realistic sample US numbers and fake OTP/SMS messages.
2. Frontend: Build homepage with navbar, hero, number grid with search/filter, how-it-works section, footer. Build number detail view showing messages list. Detect OTP patterns in message bodies and highlight them.

/** Wedding facts in one place. All times are Indian Standard Time (UTC+05:30). */

export type EventKey = "haldi" | "wedding";

export interface CeremonyEvent {
  key: EventKey;
  /** ISO start with the IST offset */
  start: string;
  /** used for the calendar entry only */
  hours: number;
  place: "venue" | null;
}

export const EVENTS: CeremonyEvent[] = [
  { key: "haldi", start: "2026-11-30T09:00:00+05:30", hours: 4, place: null },
  { key: "wedding", start: "2026-12-03T10:51:00+05:30", hours: 5, place: "venue" },
];


/** The wedding muhurtham the countdown runs to. */
export const WEDDING_AT = new Date("2026-12-03T10:51:00+05:30");

export const VENUE = {
  name: "PBR Convention",
  address: "Nagole – Bandlaguda Road, Hyderabad",
  mapsQuery: "PBR Convention Hall, Nagole Rd, Bandlaguda, Hyderabad, Telangana 500068",
};

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapsQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(VENUE.mapsQuery)}&output=embed`;

const compactUtc = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function googleCalendarUrl(ev: CeremonyEvent, title: string, details: string, location: string) {
  const start = new Date(ev.start);
  const end = new Date(start.getTime() + ev.hours * 3600_000);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${compactUtc(start)}/${compactUtc(end)}`,
    details,
    location,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

export function splitCountdown(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

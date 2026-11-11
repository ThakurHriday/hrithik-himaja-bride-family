import { describe, expect, it } from "vitest";
import { EVENTS, VENUE, WEDDING_AT, googleCalendarUrl, splitCountdown } from "@/components/wedding/details";
import { DICTS } from "@/components/wedding/i18n";

const at = (k: string) => new Date(EVENTS.find((e) => e.key === k)!.start).toISOString();

describe("bride's family wedding details (IST)", () => {
  it("countdown runs to 3 Dec 2026, 10:51 AM IST", () => {
    expect(WEDDING_AT.toISOString()).toBe("2026-12-03T05:21:00.000Z");
  });
  it("only Haldi & Pelli Kuthuru and the Wedding are listed", () => {
    expect(EVENTS.map((e) => e.key)).toEqual(["haldi", "wedding"]);
  });
  it("Haldi & Pelli Kuthuru is Mon 30 Nov 2026 at 9:00 AM IST", () => {
    expect(at("haldi")).toBe("2026-11-30T03:30:00.000Z");
    expect(DICTS.en.events.haldi.name).toBe("Haldi & Pelli Kuthuru");
  });
  it("wedding calendar link starts at the muhurtham", () => {
    const url = googleCalendarUrl(EVENTS.find((e) => e.key === "wedding")!, "Wedding", "", "PBR Convention");
    expect(new URL(url).searchParams.get("dates")?.startsWith("20261203T052100Z/")).toBe(true);
  });
  it("venue is PBR Convention, Nagole – Bandlaguda Road", () => {
    expect(VENUE.name).toBe("PBR Convention");
    expect(VENUE.address).toBe("Nagole – Bandlaguda Road, Hyderabad");
  });
  it("hosted by the Devella family, parents named", () => {
    expect(DICTS.en.familyNames).toBe("The Devella family");
    expect(DICTS.en.brideParent).toBe("Smt. Aparna Devella & Late Shri Natraj Yellambatla");
  });
  it("no groom-side events remain anywhere in the text", () => {
    const all = JSON.stringify(DICTS);
    for (const w of ["Baarat", "Ratjagah", "Mandwa", "Satyanarayana", "Thakur family"]) expect(all).not.toContain(w);
  });
  it("splits a countdown into days, hours, minutes, seconds", () => {
    expect(splitCountdown(((1 * 24 + 2) * 3600 + 3 * 60 + 4) * 1000)).toEqual({ days: 1, hours: 2, minutes: 3, seconds: 4 });
  });
});

describe("Hindi switch", () => {
  it("Hindi has every English text key", () => {
    expect(Object.keys(DICTS.hi).sort()).toEqual(Object.keys(DICTS.en).sort());
    expect(Object.keys(DICTS.hi.events).sort()).toEqual(Object.keys(DICTS.en.events).sort());
  });
});

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { EventKey } from "./details";

export type Lang = "en" | "hi";

interface EventCopy {
  name: string;
  alt: string;
  day: string;
  time: string;
  note: string;
}

const en = {
  langSwitch: "हिं",
  langSwitchLabel: "हिन्दी में देखें",
  musicPlay: "Play music",
  musicPause: "Pause music",
  scroll: "Scroll",
  nextPage: "Next Page",

  inviteKicker: "With the blessings of our families",
  inviteLine: "Srirasthu · Shubhamasthu · Avighnamasthu",
  groom: "Hrithik Thakur",
  bride: "Himaja",
  and: "&",
  scratchHint: "Scratch the heart to reveal our date",
  scratchFoil: "Scratch here",
  revealButton: "Or tap here to reveal",
  saveDate: "Save the date",
  weekday: "Thursday",
  dayNum: "03",
  monthYear: "December 2026",
  muhurtham: "10:51 AM · Muhurtham",
  revealedVenue: "PBR Convention, Hyderabad",

  navInvitation: "Invitation",
  navDetails: "Wedding details",
  navEvents: "Celebrations",
  navGallery: "Gallery",
  navCountdown: "Countdown",
  navLove: "With love",
  lineageInvoke: "॥ Srirasthu · Shubhamasthu · Avighnamasthu ॥",
  detailsKicker: "The wedding celebration",
  detailsTitle: "The Wedding",
  groomParentsLine: "S/O Smt. Bhavani Thakur & Sri Venu Gopal Singh Thakur",
  brideParentLine: "Only D/O Aparna Devella & Sri Natraj Yellambatla",
  weds: "Weds",
  dateLabel: "Date",
  dateValue: "3rd December 2026",
  timeLabel: "Ceremony Time",
  timeValue: "10:51 a.m.",
  venueLabel: "Venue",
  addressLabel: "Address",

  storyTitle: "Our story",
  storyBody:
    "Every love story is beautiful, and ours is still being written down. The whole tale of how Hrithik and Himaja found each other will be told here very soon.",
  storyMoments: [
    { when: "The first hello", what: "A moment we will share with you soon" },
    { when: "The yes", what: "Our families said yes, with all their hearts" },
    { when: "3 December 2026", what: "Forever begins, in Hyderabad" },
  ],

  galleryTitle: "Us, so far",
  galleryNote: "Our photographs are on their way",

  eventsTitle: "The celebrations",
  addToCalendar: "Add to calendar",
  residenceLabel: "Residence",
  events: {
    haldi: { name: "Haldi & Pelli Kuthuru", alt: "హల్దీ & పెళ్లి కూతురు", day: "Mon, 30 Nov", time: "9:00 am onwards", note: "Turmeric blessings as Himaja becomes the bride" },
    wedding: { name: "Wedding", alt: "వివాహం", day: "Thu, 3 Dec", time: "10:51 am", note: "PBR Convention, Nagole – Bandlaguda Road" },
  } satisfies Record<EventKey, EventCopy>,

  countdownTitle: "The auspicious hour",
  units: ["Days", "Hours", "Minutes", "Seconds"],
  countdownUntil: "until the wedding muhurtham, Thursday 3 December, 10:51 AM",
  countdownDone: "The celebrations have begun",

  venueName: "PBR Convention",
  venueAddress: "Nagole – Bandlaguda Road, Hyderabad",
  openMaps: "Open in Google Maps",

  travelTitle: "Getting there",
  travel: [
    { label: "By air", text: "Rajiv Gandhi International Airport (HYD) is about an hour's drive from the venue." },
    { label: "By metro", text: "Nagole Metro Station, at the end of the Blue Line, is a short drive away." },
    { label: "By train", text: "Secunderabad Junction is around 30 to 40 minutes away by road." },
  ],
  travelHelp: "Need help with travel or a stay? Our families will happily arrange it.",

  dressTitle: "Dress code",
  dressIntro: "A colour for each celebration, if you would like a hint.",
  dress: {
    haldi: "Haldi yellow and marigold",
    wedding: "Royal gold and ivory",
  } satisfies Record<EventKey, string>,

  familiesTitle: "With the blessings of our families",
  blessings: "With love and blessings",
  groomSide: "On behalf of the groom",
  groomParents: "Thakur Venugopal Singh & Thakur Bhavani",
  brideSide: "Parents of the Bride",
  brideParent: "Smt. Aparna Devella & Shri Natraj Yellambatla",
  awaiting: "Awaiting your gracious presence",
  familyNames: "Devalla Vishwanath and Neelima",

  songTitle: "Our song",
  songNote: "The song that walks with us, four steps at a time.",
  songTrack: "Chaar Kadam",
  songArtist: "Shaan & Shreya Ghoshal · PK",
  songSpotify: "Listen on Spotify",

  closingLove: "With love and blessings",
  closingSee: "See you in Hyderabad",
  invitedBy: "Invited by",
  backToTop: "Watch the opening again",
};

export type Dict = typeof en;

const hi: Dict = {
  langSwitch: "EN",
  langSwitchLabel: "View in English",
  musicPlay: "संगीत चलाएँ",
  musicPause: "संगीत रोकें",
  scroll: "नीचे देखें",
  nextPage: "अगला पृष्ठ",

  inviteKicker: "हमारे परिवारों के आशीर्वाद से",
  inviteLine: "श्रीरस्तु · शुभमस्तु · अविघ्नमस्तु",
  groom: "हृतिक ठाकुर",
  bride: "हिमजा",
  and: "संग",
  scratchHint: "हमारी शुभ तिथि जानने के लिए दिल को खुरचें",
  scratchFoil: "यहाँ खुरचें",
  revealButton: "या यहाँ छूकर देखें",
  saveDate: "शुभ तिथि",
  weekday: "गुरुवार",
  dayNum: "03",
  monthYear: "दिसंबर 2026",
  muhurtham: "सुबह 10:51 · शुभ मुहूर्त",
  revealedVenue: "पीबीआर कन्वेंशन, हैदराबाद",

  navInvitation: "निमंत्रण",
  navDetails: "विवाह विवरण",
  navEvents: "समारोह",
  navGallery: "झलकियाँ",
  navCountdown: "उलटी गिनती",
  navLove: "स्नेह सहित",
  lineageInvoke: "॥ श्रीरस्तु · शुभमस्तु · अविघ्नमस्तु ॥",
  detailsKicker: "शुभ विवाह समारोह",
  detailsTitle: "शुभ विवाह",
  groomParentsLine: "सुपुत्र श्रीमती भवानी ठाकुर एवं श्री वेणु गोपाल सिंह ठाकुर",
  brideParentLine: "एकमात्र सुपुत्री श्रीमती अपर्णा देवेल्ला एवं श्री नटराज यल्लमबतला",
  weds: "संग",
  dateLabel: "तिथि",
  dateValue: "3 दिसंबर 2026",
  timeLabel: "मुहूर्त",
  timeValue: "सुबह 10:51",
  venueLabel: "स्थान",
  addressLabel: "पता",

  storyTitle: "हमारी कहानी",
  storyBody:
    "हर प्रेम कहानी सुंदर होती है, और हमारी अभी लिखी जा रही है। हृतिक और हिमजा के मिलने की पूरी कहानी बहुत जल्द यहाँ होगी।",
  storyMoments: [
    { when: "पहली मुलाक़ात", what: "वह पल, जो हम जल्द आपसे बाँटेंगे" },
    { when: "वह हाँ", what: "दोनों परिवारों ने पूरे दिल से हाँ कहा" },
    { when: "3 दिसंबर 2026", what: "हैदराबाद में, सदा का साथ शुरू" },
  ],

  galleryTitle: "अब तक का सफ़र",
  galleryNote: "हमारी तस्वीरें जल्द आ रही हैं",

  eventsTitle: "उत्सव",
  addToCalendar: "कैलेंडर में जोड़ें",
  residenceLabel: "निवास स्थान",
  events: {
    haldi: { name: "हल्दी और पेल्लि कूतुरु", alt: "Haldi & Pelli Kuthuru", day: "सोम, 30 नवंबर", time: "सुबह 9:00 बजे से", note: "हल्दी के आशीर्वाद के साथ हिमजा बनेंगी दुल्हन" },
    wedding: { name: "विवाह", alt: "Wedding", day: "गुरु, 3 दिसंबर", time: "सुबह 10:51", note: "पीबीआर कन्वेंशन, नागोल – बंडलगुडा रोड" },
  },

  countdownTitle: "शुभ घड़ी की प्रतीक्षा",
  units: ["दिन", "घंटे", "मिनट", "सेकंड"],
  countdownUntil: "गुरुवार, 3 दिसंबर, सुबह 10:51 के शुभ मुहूर्त तक",
  countdownDone: "उत्सव आरंभ हो चुका है",

  venueName: "पीबीआर कन्वेंशन",
  venueAddress: "नागोल – बंडलगुडा रोड, हैदराबाद",
  openMaps: "गूगल मैप्स में खोलें",

  travelTitle: "कैसे पहुँचें",
  travel: [
    { label: "हवाई मार्ग", text: "राजीव गांधी अंतरराष्ट्रीय हवाई अड्डा (HYD) स्थल से लगभग एक घंटे की दूरी पर है।" },
    { label: "मेट्रो", text: "ब्लू लाइन का अंतिम स्टेशन, नागोल मेट्रो, यहाँ से थोड़ी ही दूरी पर है।" },
    { label: "रेल", text: "सिकंदराबाद जंक्शन सड़क मार्ग से लगभग 30 से 40 मिनट की दूरी पर है।" },
  ],
  travelHelp: "यात्रा या ठहरने में मदद चाहिए? हमारा परिवार ख़ुशी से व्यवस्था करेगा।",

  dressTitle: "परिधान",
  dressIntro: "हर उत्सव के लिए एक रंग, अगर आप संकेत चाहें।",
  dress: {
    haldi: "हल्दी पीला और गेंदा",
    wedding: "शाही सुनहरा और हाथीदांत",
  },

  familiesTitle: "हमारे परिवारों के आशीर्वाद से",
  blessings: "स्नेह और आशीर्वाद सहित",
  groomSide: "वर पक्ष से",
  groomParents: "ठाकुर वेणुगोपाल सिंह एवं ठाकुर भवानी",
  brideSide: "वधू के माता-पिता",
  brideParent: "श्रीमती अपर्णा देवेल्ला एवं श्री नटराज यल्लमबतला",
  awaiting: "आपकी गरिमामयी उपस्थिति की प्रतीक्षा में",
  familyNames: "देवला विश्वनाथ एवं नीलीमा",

  songTitle: "हमारा गीत",
  songNote: "वह गीत जो हर कदम हमारे साथ चलता है।",
  songTrack: "चार कदम",
  songArtist: "शान और श्रेया घोषाल · पीके",
  songSpotify: "Spotify पर सुनें",

  closingLove: "स्नेह और आशीर्वाद सहित",
  closingSee: "हैदराबाद में मिलते हैं",
  invitedBy: "निमंत्रक",
  backToTop: "शुरुआत फिर से देखें",
};

const DICTS: Record<Lang, Dict> = { en, hi };

interface LangCtx {
  lang: Lang;
  t: Dict;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: "en", t: en, toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("hh-lang");
    if (saved === "hi") setLang("hi");
  }, []);
  const toggle = useCallback(() => {
    setLang((l) => {
      const next = l === "en" ? "hi" : "en";
      window.localStorage.setItem("hh-lang", next);
      return next;
    });
  }, []);
  const value = useMemo(() => ({ lang, t: DICTS[lang], toggle }), [lang, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
export { DICTS };

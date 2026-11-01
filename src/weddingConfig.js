/*
  WEDDING WEBSITE CONFIGURATION
  Personalized for Virajitha & Sai Bhargav
*/

export const weddingConfig = {
  brideName: "Virajitha",
  groomName: "Sai Bhargav",
  coupleDisplay: "Virajitha & Sai Bhargav",
  monogram: "V & B",

  // Format: YYYY-MM-DDTHH:mm:ss (Wedding ceremony: 18 Dec 2026 at 6:00 PM)
  weddingDate: "2026-12-18T18:00:00",

  weddingDateText: "18 December 2026",
  weddingShortDate: "18.12.2026",
  weddingDay: "Friday",
  weddingTime: "6:00 PM onwards",

  venueName: "Sri Venkateswara Kalyanamandapam",
  venueAddress: "Sri Venkateswara Kalyanamandapam, Korukonda Road, Andhra Pradesh, India",
  attire: "Traditional / Festive Elegance",

  // Google Maps search or place URL
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Sri Venkateswara Kalyanamandapam, Korukonda"),

  mapEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Sri Venkateswara Kalyanamandapam, Korukonda") +
    "&z=14&output=embed",

  /*
    WhatsApp number that should receive RSVPs.
    Include country code, digits only.
  */
  whatsappNumber: "917285939212"
};

export const photoGalleryData = [
  {
    id: 1,
    full: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1800&q=90",
    thumb: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",
    alt: "Wedding couple portrait",
    caption: "A Promise of Forever",
    className: "photo-tall"
  },
  {
    id: 2,
    full: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    alt: "Floral wedding decor",
    caption: "Golden Blooms & Joy",
    className: ""
  },
  {
    id: 3,
    full: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=90",
    thumb: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85",
    alt: "Romantic wedding moment",
    caption: "Laughter in the Air",
    className: ""
  },
  {
    id: 4,
    full: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1800&q=90",
    thumb: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1100&q=85",
    alt: "Festive celebration",
    caption: "Dancing into Forever",
    className: "photo-wide"
  },
  {
    id: 5,
    full: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1800&q=90",
    thumb: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85",
    alt: "Wedding venue sanctuary",
    caption: "Sacred Grounds",
    className: ""
  },
  {
    id: 6,
    full: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
    alt: "Wedding memories",
    caption: "Two Families, One Heart",
    className: ""
  }
];

export const weddingEventsData = [
  {
    id: 1,
    number: "01",
    label: "THE PRE-WEDDING",
    title: "Haldi Ceremony",
    icon: "✦",
    date: "17 December 2026",
    time: "5:00 PM onwards",
    venue: "Home Residence",
    description: "A joyful evening bathed in turmeric, bright smiles, family laughter, and golden blessings.",
    featured: false
  },
  {
    id: 2,
    number: "02",
    label: "THE MAIN CEREMONY",
    title: "Wedding Ceremony",
    icon: "❦",
    date: "18 December 2026",
    time: "6:00 PM onwards",
    venue: "Sri Venkateswara Kalyanamandapam",
    description: "Two souls, two families, and timeless vows woven together under the sacred wedding mandap.",
    featured: true
  },
  {
    id: 3,
    number: "03",
    label: "THE RECEPTION",
    title: "Reception",
    icon: "✧",
    date: "20 December 2026",
    time: "7:00 PM onwards",
    venue: "Korukonda",
    description: "An enchanting evening of celebration, delicious feast, music, heartfelt toasts, and dancing.",
    featured: false
  }
];

// Helper to generate Google Calendar Event URL (18 Dec 2026 6:00 PM IST is 12:30 UTC)
export function getGoogleCalendarUrl() {
  const title = encodeURIComponent(`${weddingConfig.brideName} & ${weddingConfig.groomName}'s Wedding`);
  const details = encodeURIComponent(
    `We joyfully invite you to celebrate the wedding ceremony of ${weddingConfig.brideName} & ${weddingConfig.groomName} at ${weddingConfig.venueName}.`
  );
  const location = encodeURIComponent(`${weddingConfig.venueName}, ${weddingConfig.venueAddress}`);
  // Date format: YYYYMMDDTHHmmssZ (18 Dec 2026 18:00 IST = 12:30 UTC)
  const dates = "20261218T123000Z/20261218T183000Z";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

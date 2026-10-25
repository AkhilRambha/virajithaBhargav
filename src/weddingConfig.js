/*
  WEDDING WEBSITE CONFIGURATION
  Edit these values to personalize your website.
*/

export const weddingConfig = {
  groomName: "Akhil",
  brideName: "Sneha",
  monogram: "A & S",

  // Format: YYYY-MM-DDTHH:mm:ss
  weddingDate: "2026-12-12T10:00:00",

  weddingDateText: "12 December 2026",
  weddingShortDate: "12.12.2026",
  weddingTime: "10:00 AM onwards",

  venueName: "Sri Venkateswara Kalyanamandapam",
  venueAddress: "Vijayawada, Andhra Pradesh, India",
  attire: "Traditional / Festive Elegance",

  // Google Maps search or place URL
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Sri Venkateswara Kalyanamandapam, Vijayawada"),

  mapEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Sri Venkateswara Kalyanamandapam, Vijayawada") +
    "&z=14&output=embed",

  /*
    WhatsApp number that should receive RSVPs.
    Include country code, digits only.
    Example format for India: 919876543210
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
    description: "A joyful morning bathed in turmeric, bright smiles, family laughter and golden blessings.",
    time: "10:00 AM onwards",
    venue: "Family Residence",
    featured: false
  },
  {
    id: 2,
    number: "02",
    label: "THE MAIN CEREMONY",
    title: "Wedding Ceremony",
    icon: "❦",
    description: "Two souls, two families, and timeless vows woven together under the sacred wedding mandap.",
    time: "10:00 AM onwards",
    venue: "Sri Venkateswara Kalyanamandapam",
    featured: true
  },
  {
    id: 3,
    number: "03",
    label: "LET'S CELEBRATE",
    title: "Reception",
    icon: "✧",
    description: "An enchanting evening of celebration, delicious feast, music, heartfelt toasts and dancing.",
    time: "6:00 PM onwards",
    venue: "Sri Venkateswara Royal Hall",
    featured: false
  }
];

// Helper to generate Google Calendar Event URL
export function getGoogleCalendarUrl() {
  const title = encodeURIComponent(`${weddingConfig.groomName} & ${weddingConfig.brideName}'s Wedding`);
  const details = encodeURIComponent(`We joyfully invite you to celebrate our wedding ceremony at ${weddingConfig.venueName}.`);
  const location = encodeURIComponent(`${weddingConfig.venueName}, ${weddingConfig.venueAddress}`);
  // Date format: YYYYMMDDTHHmmssZ
  const dates = "20261212T043000Z/20261212T163000Z";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

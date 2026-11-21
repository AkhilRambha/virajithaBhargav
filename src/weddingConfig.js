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

  venueName: "Sri Veera Venkata Satyanarayana Function Hall",
  venueAddress: "Sree Siddhartha College Rd, opposite Siddhartha College, Angara, Andhra Pradesh 533307",
  // attire: "Traditional / Festive Elegance",

  // Google Maps search or place URL
  directionsUrl:
    "https://www.google.com/maps/place/Sri+Veera+Venkata+Satyanarayana+Function+Hall/@16.7789397,81.9349086,17z/data=!4m6!3m5!1s0x3a3795d903b161b1:0x47fdf5d1bc55edca!8m2!3d16.7789397!4d81.9349086!16s%2Fg%2F11j0054stq",

  mapEmbedUrl:
    "https://maps.google.com/maps?q=16.7789397,81.9349086&z=17&output=embed",

  /*
    WhatsApp number that should receive RSVPs.
    Include country code, digits only.
  */
  whatsappNumber: "919550516586"
};

export const photoGalleryData = [
  {
    id: 1,
    full: "/images/gallery4.jpeg",
    thumb: "/images/gallery4.jpeg",
    alt: "Virajitha and Sai Bhargav together",
    caption: "Virajitha & Sai Bhargav",
    className: "photo-tall"
  },
  {
    id: 2,
    full: "/images/gallery2.jpg",
    thumb: "/images/gallery2.jpg",
    alt: "Floral wedding decor",
    caption: "",
    className: ""
  },
  {
    id: 3,
    full: "/images/gallery3.jpeg",
    thumb: "/images/gallery3.jpeg ",
    alt: "Romantic wedding moment",
    caption: "",
    className: ""
  },
  {
    id: 4,
    full: "/images/gallery1.jpeg",
    thumb: "/images/gallery1.jpeg",
    alt: "Festive celebration",
    caption: "",
    className: "photo-wide"
  },
  {
    id: 5,
    full: "/images/gallery5.jpeg",
    thumb: "/images/gallery5.jpeg",
    alt: "Wedding venue sanctuary",
    caption: "",
    className: ""
  },
  {
    id: 6,
    full: "/images/gallery6.jpeg",
    thumb: "/images/gallery6.jpeg",
    alt: "Wedding memories",
    caption: "",
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
    venue: "Sri Veera Venkata Satyanarayana Function Hall",
    description: "Two souls, two families, and timeless vows woven together under the sacred wedding mandap.",
    featured: true
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

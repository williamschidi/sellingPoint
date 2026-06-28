/**
 * Static property catalogue fixtures for mock mode.
 * Replace with backend seed data or remove when API is live.
 */
import { buildPropertyImageUrls, MOCK_IMAGE_FALLBACK } from "../../lib/properties/mockMedia.js";
import { resolveMockAgent } from "./agents.js";

function buildDocuments(titleDocument = [], verificationStatus = "verified") {
  const catalog = [
    "Certificate of Occupancy",
    "Survey Plan",
    "Deed of Assignment",
  ];

  return catalog.map((label) => ({
    label,
    available: titleDocument.includes(label),
    accessLevel:
      verificationStatus === "verified" && titleDocument.includes(label)
        ? "summary"
        : "on-request",
    note:
      verificationStatus === "verified" && titleDocument.includes(label)
        ? "Document summary verified by SellingPoint. Request full copy from your agent after booking an inspection."
        : "Document pending verification. Available after agent review.",
  }));
}

function createProperty({
  id,
  title,
  price,
  address,
  lga,
  state,
  lat,
  lng,
  landSize,
  propertyType,
  verificationStatus = "verified",
  description,
  furtherDescripture,
  furtherDescription,
  listedAt,
  features = ["Road Access", "Electricity", "Dry Land"],
  titleDocument = ["Certificate of Occupancy", "Survey Plan"],
  imageCount = 3,
}) {
  const extendedDescription = furtherDescription ?? furtherDescripture;
  const images = buildPropertyImageUrls(id, imageCount);

  return {
    id,
    title,
    description,
    furtherDescripture: extendedDescription,
    furtherDescription: extendedDescription,
    price,
    propertyImages: images,
    imageFallback: MOCK_IMAGE_FALLBACK,
    location: { address, lga, state, lat, lng },
    landSize,
    propertyType,
    verificationStatus,
    status: "available",
    listedAt: listedAt ?? new Date().toISOString(),
    features,
    titleDocument,
    documents: buildDocuments(titleDocument, verificationStatus),
    agent: resolveMockAgent(state),
  };
}

/** Mirrors the MongoDB property document shape for future backend parity. */
export const mockProperties = [
  createProperty({
    id: "lekki-phase-1-residential-plot",
    title: "Prime Residential Plot",
    price: "12,500,000",
    address: "Lekki Phase 1",
    lga: "Eti-Osa LGA",
    state: "Lagos State",
    lat: 6.4474,
    lng: 3.4723,
    landSize: 600,
    propertyType: "Residential",
    listedAt: "2026-06-22T10:00:00.000Z",
    description:
      "This is a premium 600 sqm residential plot located in the heart of Lekki Phase 1, one of Lagos's most sought-after neighbourhoods. The land is flat, dry, and fully fenced with a concrete perimeter wall. Survey plan and Certificate of Occupancy (C of O) are available.",
    furtherDescription:
      "Excellent road frontage with easy access to Admiralty Way and Lekki-Epe Expressway. Ideal for residential development or long-term investment. All documents are verified and up to date.",
  }),
  createProperty({
    id: "gra-extension-corner-piece",
    title: "Corner Piece Land, GRA Extension",
    price: "8,200,000",
    address: "GRA Extension",
    lga: "Port Harcourt LGA",
    state: "Rivers State",
    lat: 4.8156,
    lng: 7.0498,
    landSize: 1200,
    propertyType: "Commercial",
    listedAt: "2026-06-19T10:00:00.000Z",
    description:
      "A strategically positioned corner piece land in GRA Extension, ideal for commercial development or mixed-use projects.",
    furtherDescription:
      "High visibility location with excellent access roads and growing commercial activity in the surrounding area.",
  }),
  createProperty({
    id: "gwarinpa-estate-plot",
    title: "Gwarinpa Estate Plot, FCT",
    price: "4,800,000",
    address: "Gwarinpa",
    lga: "Abuja Municipal",
    state: "FCT Abuja",
    lat: 9.0765,
    lng: 7.3986,
    landSize: 800,
    propertyType: "Residential",
    verificationStatus: "pending",
    listedAt: "2026-06-15T10:00:00.000Z",
    description:
      "Residential plot in Gwarinpa Estate, one of Abuja's established neighbourhoods with good infrastructure.",
    furtherDescription:
      "Suitable for private residential development with access to schools, markets, and major roads.",
    titleDocument: ["Survey Plan"],
  }),
  createProperty({
    id: "ikoyi-waterfront-land",
    title: "Ikoyi Waterfront Land",
    price: "22,000,000",
    address: "Ikoyi",
    lga: "Eti-Osa LGA",
    state: "Lagos State",
    lat: 6.4541,
    lng: 3.4316,
    landSize: 2000,
    propertyType: "Premium",
    listedAt: "2026-06-21T10:00:00.000Z",
    description:
      "Premium waterfront land in Ikoyi offering rare access and high investment potential in Lagos's elite district.",
    furtherDescription:
      "Exceptional location for luxury residential or high-end mixed-use development with strong long-term value.",
    titleDocument: [
      "Certificate of Occupancy",
      "Survey Plan",
      "Deed of Assignment",
    ],
  }),
  createProperty({
    id: "lekki-phase-1-residential-plot-2",
    title: "Prime Residential Plot, Lekki Phase 1",
    price: "12,500,000",
    address: "Lekki Phase 1",
    lga: "Eti-Osa LGA",
    state: "Lagos State",
    lat: 6.4401,
    lng: 3.4802,
    landSize: 600,
    propertyType: "Residential",
    listedAt: "2026-06-18T10:00:00.000Z",
    description:
      "Another premium residential plot in Lekki Phase 1 with verified documents and excellent road access.",
    furtherDescription:
      "Ideal for residential build-out or land banking in a high-demand Lagos corridor.",
  }),
  createProperty({
    id: "gra-extension-corner-piece-2",
    title: "Corner Piece Land, GRA Extension",
    price: "8,200,000",
    address: "GRA Extension",
    lga: "Port Harcourt LGA",
    state: "Rivers State",
    lat: 4.8156,
    lng: 7.0498,
    landSize: 1200,
    propertyType: "Commercial",
    listedAt: "2026-06-17T10:00:00.000Z",
    description:
      "Corner piece commercial land in GRA Extension with strong visibility and development potential.",
    furtherDescription:
      "Well suited for retail, office, or mixed commercial use in a growing district.",
  }),
  createProperty({
    id: "awka-layout-residential-plot",
    title: "Awka Layout Residential Plot",
    price: "3,200,000",
    address: "Awka Layout",
    lga: "Awka South",
    state: "Anambra State",
    lat: 6.2109,
    lng: 7.0743,
    landSize: 500,
    propertyType: "Residential",
    listedAt: "2026-06-20T10:00:00.000Z",
    description:
      "Affordable residential plot in Awka Layout with good neighbourhood access and growing demand.",
    furtherDescription:
      "Suitable for first-time land buyers building within Anambra's expanding capital corridor.",
  }),
  createProperty({
    id: "asaba-governors-estate",
    title: "Governor's Estate Plot, Asaba",
    price: "5,500,000",
    address: "Governor's Estate",
    lga: "Oshimili South",
    state: "Delta State",
    lat: 6.1833,
    lng: 6.7348,
    landSize: 900,
    propertyType: "Residential",
    listedAt: "2026-06-16T10:00:00.000Z",
    description:
      "Serviced plot within Governor's Estate Asaba with strong residential appeal.",
    furtherDescription:
      "Ideal for family homes with access to major road networks in Delta State.",
  }),
  createProperty({
    id: "enugu-independence-layout",
    title: "Independence Layout Corner Plot",
    price: "6,100,000",
    address: "Independence Layout",
    lga: "Enugu North",
    state: "Enugu State",
    lat: 6.4413,
    lng: 7.4983,
    landSize: 750,
    propertyType: "Residential",
    listedAt: "2026-06-14T10:00:00.000Z",
    description:
      "Corner plot in Independence Layout Enugu with verified survey documentation.",
    furtherDescription:
      "Strong location for residential development in a established Enugu neighbourhood.",
  }),
  createProperty({
    id: "ogun-abeokuta-express-corridor",
    title: "Abeokuta Express Corridor Land",
    price: "2,900,000",
    address: "Abeokuta Express",
    lga: "Obafemi-Owode",
    state: "Ogun State",
    lat: 7.1608,
    lng: 3.3566,
    landSize: 650,
    propertyType: "Residential",
    listedAt: "2026-06-13T10:00:00.000Z",
    description:
      "Budget-friendly plot along the Abeokuta express corridor with Lagos outskirts growth potential.",
    furtherDescription:
      "Popular with investors targeting Ogun State's expanding commuter belt.",
  }),
  createProperty({
    id: "imo-owerri-municipal-plot",
    title: "Owerri Municipal Plot",
    price: "3,800,000",
    address: "Owerri Municipal",
    lga: "Owerri Municipal",
    state: "Imo State",
    lat: 5.4927,
    lng: 7.0266,
    landSize: 550,
    propertyType: "Commercial",
    listedAt: "2026-06-12T10:00:00.000Z",
    description:
      "Compact commercial plot in Owerri Municipal suitable for retail or mixed use.",
    furtherDescription:
      "High visibility location with verified title documentation on file.",
  }),
];

export const mockTimeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

/** Booked slots — same shape as GET /properties/:id/inspection-slots */
export const mockBookedSlots = [
  {
    propertyId: "lekki-phase-1-residential-plot",
    date: "2026-06-20",
    time: "9:00 AM",
  },
  {
    propertyId: "lekki-phase-1-residential-plot",
    date: "2026-06-20",
    time: "11:00 AM",
  },
  {
    propertyId: "lekki-phase-1-residential-plot",
    date: "2026-06-21",
    time: "2:00 PM",
  },
];

/** In-memory store for submitted requests (resets on page refresh). */
export const mockInspectionRequests = [];

const MOCK_DELAY_MS = 300;

export function mockDelay() {
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
}

export function getMockPropertyById(propertyId) {
  return mockProperties.find((p) => p.id === propertyId) ?? null;
}

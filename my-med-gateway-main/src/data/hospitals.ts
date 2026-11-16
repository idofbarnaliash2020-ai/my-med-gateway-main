export type HospitalType = "Government" | "Private" | "Trust";
export type BedAvailabilityStatus = "Fresh" | "Stale" | "Not reported";

export interface Hospital {
  id: string;
  name: string;
  type: HospitalType;
  city: string;
  state: string;
  beds: { general: number; icu: number; emergency: number; total: number } | null;
  bedStatus: BedAvailabilityStatus;
  bedLastUpdated: string | null;
  phone: string | null;
  email: string | null;
  specialities: string[] | null;
  facilities: string[] | null;
  rating: number | null;
  // Positions are illustrative markers on the schematic map, not coordinates.
  x: number;
  y: number;
}

// Hospital names and locations are real directory references; every bed figure below is fictional demo data.
export const hospitals: Hospital[] = [
  { id: "ipgmer-sskm", name: "IPGMER and SSKM Hospital", type: "Government", city: "Kolkata", state: "West Bengal", beds: { general: 24, icu: 6, emergency: 8, total: 1800 }, bedStatus: "Fresh", bedLastUpdated: "16 Nov 2026, 10:00 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 79, y: 45 },
  { id: "medical-college-kolkata", name: "Medical College and Hospital, Kolkata", type: "Government", city: "Kolkata", state: "West Bengal", beds: { general: 18, icu: 4, emergency: 5, total: 1200 }, bedStatus: "Fresh", bedLastUpdated: "16 Nov 2026, 09:30 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 75, y: 42 },
  { id: "nrsmc-kolkata", name: "Nil Ratan Sircar Medical College and Hospital", type: "Government", city: "Kolkata", state: "West Bengal", beds: { general: 12, icu: 2, emergency: 3, total: 1000 }, bedStatus: "Stale", bedLastUpdated: "12 Nov 2026, 16:00 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 82, y: 48 },
  { id: "rg-kar-kolkata", name: "R. G. Kar Medical College and Hospital", type: "Government", city: "Kolkata", state: "West Bengal", beds: { general: 15, icu: 3, emergency: 4, total: 1100 }, bedStatus: "Fresh", bedLastUpdated: "16 Nov 2026, 08:45 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 78, y: 38 },
  { id: "howrah-district", name: "Howrah District Hospital", type: "Government", city: "Howrah", state: "West Bengal", beds: { general: 10, icu: 2, emergency: 4, total: 300 }, bedStatus: "Fresh", bedLastUpdated: "16 Nov 2026, 09:00 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 64, y: 55 },
  { id: "bidhannagar-sdh", name: "Bidhannagar Sub-Divisional Hospital", type: "Government", city: "Salt Lake, Kolkata", state: "West Bengal", beds: { general: 8, icu: 1, emergency: 3, total: 100 }, bedStatus: "Stale", bedLastUpdated: "15 Nov 2026, 17:00 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 84, y: 32 },
  { id: "neotia-new-town", name: "Neotia Bhagirathi Woman and Child Care Centre", type: "Private", city: "New Town, Kolkata", state: "West Bengal", beds: { general: 7, icu: 2, emergency: 2, total: 100 }, bedStatus: "Fresh", bedLastUpdated: "16 Nov 2026, 08:30 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 89, y: 28 },
  { id: "calcutta-national-medical-college", name: "Calcutta National Medical College and Hospital", type: "Government", city: "Park Circus, Kolkata", state: "West Bengal", beds: { general: 11, icu: 2, emergency: 4, total: 800 }, bedStatus: "Fresh", bedLastUpdated: "16 Nov 2026, 09:15 IST (simulated)", phone: null, email: null, specialities: null, facilities: null, rating: null, x: 76, y: 51 },
];

export const allSpecialities = Array.from(
  new Set(hospitals.flatMap((hospital) => hospital.specialities ?? [])),
).sort();

export const getHospital = (id: string | null | undefined) =>
  hospitals.find((hospital) => hospital.id === id);

export const availableBeds = (hospital: Hospital): number | null => {
  if (!hospital.beds) return null;
  return hospital.beds.general + hospital.beds.icu + hospital.beds.emergency;
};

export type HospitalType = "Government" | "Private" | "Trust";

export interface Hospital {
  id: string;
  name: string;
  type: HospitalType;
  city: string;
  state: string;
  beds: { general: number; icu: number; emergency: number; total: number } | null;
  phone: string | null;
  email: string | null;
  specialities: string[] | null;
  facilities: string[] | null;
  rating: number | null;
  // Positions are illustrative markers on the schematic map, not coordinates.
  x: number;
  y: number;
}

export const hospitals: Hospital[] = [
  {
    id: "aiims-new-delhi",
    name: "AIIMS New Delhi",
    type: "Government",
    city: "New Delhi",
    state: "Delhi",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 48,
    y: 35,
  },
  {
    id: "apollo-greams-road",
    name: "Apollo Hospitals, Greams Road",
    type: "Private",
    city: "Chennai",
    state: "Tamil Nadu",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 57,
    y: 82,
  },
  {
    id: "ipgmer-sskm",
    name: "IPGMER and SSKM Hospital",
    type: "Government",
    city: "Kolkata",
    state: "West Bengal",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 79,
    y: 45,
  },
  {
    id: "kem-mumbai",
    name: "KEM Hospital",
    type: "Government",
    city: "Mumbai",
    state: "Maharashtra",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 31,
    y: 56,
  },
  {
    id: "nimhans-bengaluru",
    name: "NIMHANS",
    type: "Government",
    city: "Bengaluru",
    state: "Karnataka",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 47,
    y: 72,
  },
  {
    id: "aiims-bhubaneswar",
    name: "AIIMS Bhubaneswar",
    type: "Government",
    city: "Bhubaneswar",
    state: "Odisha",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 70,
    y: 58,
  },
  {
    id: "sgpgims-lucknow",
    name: "SGPGIMS",
    type: "Government",
    city: "Lucknow",
    state: "Uttar Pradesh",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 58,
    y: 39,
  },
  {
    id: "gmch-guwahati",
    name: "Gauhati Medical College and Hospital",
    type: "Government",
    city: "Guwahati",
    state: "Assam",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 91,
    y: 37,
  },
  {
    id: "sms-jaipur",
    name: "SMS Hospital",
    type: "Government",
    city: "Jaipur",
    state: "Rajasthan",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 37,
    y: 40,
  },
  {
    id: "aiims-bhopal",
    name: "AIIMS Bhopal",
    type: "Government",
    city: "Bhopal",
    state: "Madhya Pradesh",
    beds: null,
    phone: null,
    email: null,
    specialities: null,
    facilities: null,
    rating: null,
    x: 47,
    y: 49,
  },
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

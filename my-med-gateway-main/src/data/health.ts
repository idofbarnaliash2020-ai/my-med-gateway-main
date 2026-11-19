// SAMPLE DATA — patient profile, notifications, and public-health figures are fictional.
export const notifications = [
  { id: "n1", type: "info", title: "Blood donation camp (sample)", body: "A Kolkata-area hospital is hosting an illustrative donation drive this Sunday.", time: "2h ago" },
  { id: "n2", type: "warning", title: "Seasonal health advisory (sample)", body: "Illustrative Kolkata public-health notice. Check official sources for current advisories.", time: "5h ago" },
  { id: "n3", type: "success", title: "Bed availability updated (sample)", body: "A Kolkata hospital directory entry has a simulated bed-count update.", time: "Yesterday" },
] as const;

export const samplePatient = {
  name: "Rohan Sharma (Fictional)",
  id: "MRQ-DEMO-0001",
  age: 34,
  gender: "Male",
  bloodGroup: "B+",
  phone: "+91 00000 00000",
  emergencyContact: "Kavya Sharma (spouse) — +91 00000 00001",
  allergies: [
    { name: "Penicillin", severity: "High", reaction: "Hives, breathing difficulty" },
    { name: "Peanuts", severity: "Moderate", reaction: "Skin rash" },
  ],
  conditions: [
    { name: "Mild asthma", since: "2015", status: "Controlled" },
    { name: "Vitamin D deficiency", since: "2022", status: "Resolved" },
  ],
  prescriptions: [
    { drug: "Salbutamol inhaler 100 mcg", dose: "2 puffs as needed", prescribedBy: "Dr. Rahul Banerjee", date: "2026-08-12", active: true },
    { drug: "Cholecalciferol 60,000 IU", dose: "Once weekly × 8 weeks", prescribedBy: "Dr. Rahul Banerjee", date: "2022-03-04", active: false },
  ],
  visits: [
    { date: "2026-08-12", hospital: "National Institute Hospital (Sample)", doctor: "Dr. Rahul Banerjee", reason: "Asthma review", notes: "Lung function stable. Continue inhaler as needed." },
    { date: "2025-11-30", hospital: "City General Hospital (Sample)", doctor: "Dr. Ananya Rao", reason: "Chest discomfort", notes: "ECG normal. Advised lifestyle changes." },
    { date: "2024-06-18", hospital: "Riverside District Hospital (Sample)", doctor: "Dr. Vikram Singh", reason: "Ankle sprain", notes: "Grade I sprain. Rest, ice, compression." },
  ],
};

// Kolkata-first prototype coverage. Other West Bengal districts are a roadmap, not live coverage.
export const regions = ["Kolkata", "Howrah", "North 24 Parganas", "South 24 Parganas", "Hooghly", "Nadia"] as const;

// Weekly case counts are fictional demo values, not official surveillance reports.
export const diseaseTrends = [
  { week: "Oct W1", date: "2026-10-05", dengue: 18, malaria: 7, influenza: 46, gastro: 24 },
  { week: "Oct W2", date: "2026-10-12", dengue: 22, malaria: 8, influenza: 43, gastro: 27 },
  { week: "Oct W3", date: "2026-10-19", dengue: 29, malaria: 9, influenza: 41, gastro: 30 },
  { week: "Oct W4", date: "2026-10-26", dengue: 34, malaria: 11, influenza: 39, gastro: 33 },
  { week: "Nov W1", date: "2026-11-02", dengue: 41, malaria: 12, influenza: 42, gastro: 31 },
  { week: "Nov W2", date: "2026-11-09", dengue: 38, malaria: 10, influenza: 45, gastro: 29 },
  { week: "Nov W3", date: "2026-11-16", dengue: 36, malaria: 9, influenza: 48, gastro: 28 },
];

export const regionCapacity = [
  { region: "Kolkata", occupied: 720, total: 980 },
  { region: "Howrah", occupied: 310, total: 460 },
  { region: "North 24 Parganas", occupied: 490, total: 720 },
  { region: "South 24 Parganas", occupied: 260, total: 410 },
  { region: "Hooghly", occupied: 230, total: 360 },
  { region: "Nadia", occupied: 190, total: 310 },
];

export const hotspots = [
  { region: "Kolkata", x: 55, y: 52, level: "high", signal: "Illustrative dengue reports above the demo four-week average" },
  { region: "Howrah", x: 38, y: 61, level: "medium", signal: "Simulated bed occupancy above 70%" },
  { region: "North 24 Parganas", x: 70, y: 30, level: "medium", signal: "Fictional seasonal influenza reports rising slowly" },
  { region: "South 24 Parganas", x: 65, y: 82, level: "low", signal: "Illustrative values within the demo range" },
  { region: "Hooghly", x: 28, y: 35, level: "low", signal: "Illustrative values within the demo range" },
  { region: "Nadia", x: 80, y: 16, level: "low", signal: "Illustrative values within the demo range" },
] as const;

export const simulatedAlerts = [
  { id: "a1", severity: "High", region: "Kolkata", title: "Illustrative rise in dengue reports", detail: "Demo rule: fictional weekly dengue counts exceeded the sample four-week average. This is not a real alert or confirmed outbreak; official surveillance data and field verification are required." },
  { id: "a2", severity: "Medium", region: "Howrah", title: "Illustrative bed-capacity pressure", detail: "Demo rule: fictional reported occupancy above 70%. Confirm actual capacity with hospital administrators before any action." },
  { id: "a3", severity: "Low", region: "North 24 Parganas", title: "Illustrative seasonal influenza trend", detail: "Demo rule: fictional influenza counts increased across sample weeks. These values are not real reports; monitor only with verified official data." },
];

import { describe, expect, it } from "vitest";
import { availableBeds, hospitals } from "@/data/hospitals";

describe("Pan-India hospital directory", () => {
  it("lists the ten requested institutions across cities and states", () => {
    expect(hospitals).toHaveLength(10);
    expect(new Set(hospitals.map((hospital) => hospital.id)).size).toBe(10);
    expect(new Set(hospitals.map((hospital) => hospital.state)).size).toBeGreaterThan(5);
    expect(hospitals.map((hospital) => hospital.city)).toContain("Guwahati");
    expect(hospitals.map((hospital) => hospital.city)).toContain("Chennai");
  });

  it("does not imply unverified contact, facility, rating, or bed data is available", () => {
    for (const hospital of hospitals) {
      expect(hospital.phone).toBeNull();
      expect(hospital.email).toBeNull();
      expect(hospital.facilities).toBeNull();
      expect(hospital.specialities).toBeNull();
      expect(hospital.rating).toBeNull();
      expect(availableBeds(hospital)).toBeNull();
    }
  });
});

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, FileHeart, LogOut, UserRound } from "lucide-react";
import { PatientSessionGate, PATIENT_DEMO_SESSION_KEY } from "@/components/PatientSessionGate";
import { Button } from "@/components/ui/button";
import { DemoBadge, PageHeader } from "@/components/common";

export const Route = createFileRoute("/patient-dashboard")({
  head: () => ({
    meta: [
      { title: "Patient Dashboard (Prototype) — MediResQ" },
      {
        name: "description",
        content: "Prototype patient dashboard available after the on-screen demo OTP flow.",
      },
    ],
  }),
  component: PatientDashboard,
});

function PatientDashboard() {
  return (
    <PatientSessionGate>
      <PatientDashboardContent />
    </PatientSessionGate>
  );
}

function PatientDashboardContent() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const logout = () => {
    try {
      window.sessionStorage.removeItem(PATIENT_DEMO_SESSION_KEY);
    } catch {
      setError("Could not clear this tab's demo session. Close the tab to end it.");
      return;
    }
    void navigate({ to: "/patient-login", replace: true });
  };

  return (
    <div>
      <PageHeader
        title="Patient Dashboard"
        subtitle="You have entered a prototype-only demo session. No patient details were saved."
        icon={<UserRound />}
        actions={<DemoBadge>Not real authentication</DemoBadge>}
      />
      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <p className="text-sm text-muted-foreground">
          This demonstration does not verify identity or provide secure access to medical records.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="teal">
            <Link to="/hospitals">
              <Building2 /> Find hospitals
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/records">
              <FileHeart /> Demo medical records
            </Link>
          </Button>
          <Button variant="outline" onClick={logout}>
            <LogOut /> Log out
          </Button>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}

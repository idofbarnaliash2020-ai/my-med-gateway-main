import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

const SESSION_KEY = "my-med-gateway.patient-demo-session";

export function PatientSessionGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);

  useEffect(() => {
    try {
      const hasSession = window.sessionStorage.getItem(SESSION_KEY) === "verified";
      setVerified(hasSession);
      if (!hasSession) {
        void navigate({ to: "/patient-login", replace: true });
      }
    } catch {
      setStorageUnavailable(true);
    }
  }, [navigate]);

  if (storageUnavailable) {
    return (
      <p role="alert" className="py-12 text-center text-sm text-destructive">
        Browser session storage is unavailable. Patient demo pages cannot be opened.
      </p>
    );
  }

  if (!verified) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Checking demo patient session…
      </p>
    );
  }

  return children;
}

export { SESSION_KEY as PATIENT_DEMO_SESSION_KEY };

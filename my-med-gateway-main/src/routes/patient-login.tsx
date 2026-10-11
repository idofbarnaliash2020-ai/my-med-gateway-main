import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DemoBadge, PageHeader } from "@/components/common";
import { generateDemoOtp } from "@/lib/demo-otp";
import { PATIENT_DEMO_SESSION_KEY } from "@/components/PatientSessionGate";

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 30 * 1000;
const MAX_SENDS = 3;
const MAX_ATTEMPTS = 5;

export const Route = createFileRoute("/patient-login")({
  head: () => ({
    meta: [
      { title: "Patient Login (Prototype) — MediResQ" },
      {
        name: "description",
        content:
          "Prototype-only patient login using an on-screen demo OTP. No SMS is sent and no identity is verified.",
      },
    ],
  }),
  component: PatientLogin,
});

function PatientLogin() {
  const navigate = useNavigate();
  return <PatientLoginForm onVerified={() => void navigate({ to: "/patient-dashboard" })} />;
}

export function PatientLoginForm({ onVerified }: { onVerified: () => void }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [resendAfter, setResendAfter] = useState(0);
  const [sends, setSends] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [error, setError] = useState("");

  useEffect(() => {
    if (!demoOtp) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [demoOtp]);

  const cooldownSeconds = Math.max(0, Math.ceil((resendAfter - now) / 1000));
  const expirySeconds = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  const validName = /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,79}$/u.test(name.trim());
  const validMobile = /^[6-9]\d{9}$/.test(mobile);
  const canSend = cooldownSeconds === 0 && sends < MAX_SENDS;

  const sendDemoOtp = () => {
    if (!validName) {
      setError("Enter a valid name using at least 2 characters.");
      return;
    }
    if (!validMobile) {
      setError("Enter a valid 10-digit Indian mobile number starting with 6–9.");
      return;
    }
    if (cooldownSeconds > 0) {
      setError(`Please wait ${cooldownSeconds} seconds before requesting another demo code.`);
      return;
    }
    if (sends >= MAX_SENDS) {
      setError("Demo code request limit reached. Refresh this page to restart the prototype flow.");
      return;
    }

    const requestTime = Date.now();
    let generatedOtp: string;
    try {
      generatedOtp = generateDemoOtp();
    } catch {
      setError("This browser cannot generate a demo OTP. Try again in a supported browser.");
      return;
    }
    setDemoOtp(generatedOtp);
    setOtp("");
    setExpiresAt(requestTime + OTP_TTL_MS);
    setResendAfter(requestTime + RESEND_COOLDOWN_MS);
    setSends((count) => count + 1);
    setAttempts(0);
    setNow(requestTime);
    setError("");
  };

  const verifyDemoOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!demoOtp) {
      setError("Request a demo OTP before verifying.");
      return;
    }
    if (Date.now() >= expiresAt) {
      setError("This demo OTP has expired. Request a new code to continue.");
      return;
    }
    if (attempts >= MAX_ATTEMPTS) {
      setError("Too many incorrect attempts. Request a new code after the cooldown.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter all 6 digits of the demo OTP.");
      return;
    }
    if (otp !== demoOtp) {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setOtp("");
      setError(
        nextAttempts >= MAX_ATTEMPTS
          ? "Too many incorrect attempts. This code is locked."
          : `Incorrect demo OTP. ${MAX_ATTEMPTS - nextAttempts} attempts remain.`,
      );
      return;
    }

    try {
      window.sessionStorage.setItem(PATIENT_DEMO_SESSION_KEY, "verified");
    } catch {
      setError(
        "The browser could not save this tab's demo session. Allow session storage and try again.",
      );
      return;
    }
    onVerified();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Patient Login"
        subtitle="Prototype demonstration only. This flow does not send SMS or verify identity."
        icon={<UserRound />}
        actions={<DemoBadge>Prototype only</DemoBadge>}
      />
      <section className="rounded-2xl border bg-card p-5 shadow-card sm:p-7">
        <div
          role="note"
          className="mb-6 flex gap-3 rounded-xl border-2 border-warning/40 bg-warning-soft p-4 text-sm"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
          <p>
            <strong>Demo OTP (Prototype Only).</strong> A temporary code is displayed on this page.
            No SMS is sent, and this is not real identity verification or production authentication.
            Do not enter real personal or medical information.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="patient-name">Patient name</Label>
            <Input
              id="patient-name"
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="Enter your name"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="patient-mobile">Mobile number</Label>
            <div className="mt-1.5 flex gap-2">
              <span
                className="inline-flex items-center rounded-md border bg-muted px-3 text-sm font-medium"
                aria-label="Country code"
              >
                +91
              </span>
              <Input
                id="patient-mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={mobile}
                onChange={(event) => {
                  setMobile(event.target.value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                placeholder="10-digit mobile number"
              />
            </div>
          </div>

          <Button type="button" variant="teal" onClick={sendDemoOtp} disabled={!canSend}>
            {sends === 0 ? "Send Demo OTP" : "Resend Demo OTP"}
          </Button>
          {sends >= MAX_SENDS && (
            <p role="status" className="text-sm text-muted-foreground">
              Demo OTP request limit reached. Refresh this page to restart the prototype flow.
            </p>
          )}
          {demoOtp && (
            <div className="space-y-4 rounded-xl border bg-muted/50 p-4">
              <p className="text-sm font-semibold">Demo OTP (Prototype Only)</p>
              <p
                data-testid="patient-demo-otp"
                className="font-mono text-2xl font-bold tracking-[0.35em] text-primary"
                aria-label="Demo OTP (Prototype Only)"
              >
                {demoOtp}
              </p>
              <p className="text-xs text-muted-foreground">
                Not sent by SMS · expires in {Math.floor(expirySeconds / 60)}:
                {String(expirySeconds % 60).padStart(2, "0")} · up to {MAX_ATTEMPTS} verification
                attempts
              </p>
              {expirySeconds === 0 && (
                <p role="status" className="text-sm text-destructive">
                  This code has expired. Request a new demo OTP.
                </p>
              )}
              {cooldownSeconds > 0 && (
                <p className="text-xs text-muted-foreground">
                  Resend available in {cooldownSeconds} seconds.
                </p>
              )}
              {attempts >= MAX_ATTEMPTS && (
                <p className="text-sm text-destructive">
                  This code is locked after too many incorrect attempts.
                </p>
              )}
              <form onSubmit={verifyDemoOtp} className="space-y-3">
                <div>
                  <Label htmlFor="patient-otp">Enter 6-digit OTP</Label>
                  <Input
                    id="patient-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(event) => {
                      setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                      setError("");
                    }}
                    className="mt-1.5"
                  />
                </div>
                <Button type="submit" disabled={attempts >= MAX_ATTEMPTS || expirySeconds === 0}>
                  Verify OTP <ArrowRight />
                </Button>
              </form>
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          Only a demo session marker is kept in this browser tab; OTP and contact details are not
          stored.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Need emergency help?{" "}
          <Link to="/ambulance" className="font-medium text-teal underline">
            Open ambulance services without logging in
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

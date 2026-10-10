import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OTP_LENGTH = 6;
const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

interface DemoOtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purpose: string;
  destination: string;
  onVerified: () => void;
}

function generateDemoCode() {
  const value = new Uint32Array(1);
  window.crypto.getRandomValues(value);
  return String(value[0]! % 1_000_000).padStart(OTP_LENGTH, "0");
}

export function DemoOtpDialog({
  open,
  onOpenChange,
  purpose,
  destination,
  onVerified,
}: DemoOtpDialogProps) {
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");
  const [used, setUsed] = useState(false);

  useEffect(() => {
    if (!open) return;

    setCode(generateDemoCode());
    setValue("");
    setExpiresAt(Date.now() + OTP_TTL_MS);
    setAttempts(0);
    setError("");
    setUsed(false);
  }, [open]);

  const verify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (used || attempts >= MAX_ATTEMPTS) return;
    if (Date.now() >= expiresAt) {
      setError("This demo code has expired. Close and restart the verification.");
      return;
    }
    if (value.length !== OTP_LENGTH) {
      setError("Enter all 6 digits.");
      return;
    }
    if (value !== code) {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setError(
        nextAttempts >= MAX_ATTEMPTS
          ? "Too many attempts. Close and restart the verification."
          : `That code is incorrect. ${MAX_ATTEMPTS - nextAttempts} attempts remain.`,
      );
      setValue("");
      return;
    }

    setUsed(true);
    onOpenChange(false);
    onVerified();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demo OTP verification</DialogTitle>
          <DialogDescription>
            Verify before {purpose}. The demo challenge is for {destination}.
          </DialogDescription>
        </DialogHeader>
        <div
          role="note"
          className="flex gap-3 rounded-xl border-2 border-warning/40 bg-warning-soft p-4 text-sm"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
          <p>
            <strong>DEMO ONLY — no SMS or email was sent.</strong> This code is displayed here for
            demonstration and is not real security. Do not use real personal or medical information.
          </p>
        </div>
        <p className="text-sm">
          Demo OTP (not sent):{" "}
          <strong data-testid="demo-otp-code" className="font-mono tracking-widest">
            {code}
          </strong>
        </p>
        <form onSubmit={verify} className="space-y-3">
          <InputOTP
            aria-label="Enter 6-digit demo code"
            maxLength={OTP_LENGTH}
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
              setError("");
            }}
            pattern="^[0-9]+$"
            inputMode="numeric"
            autoComplete="one-time-code"
          >
            <InputOTPGroup>
              {Array.from({ length: OTP_LENGTH }, (_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">Valid for 5 minutes · up to 5 attempts</p>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={value.length !== OTP_LENGTH || attempts >= MAX_ATTEMPTS}
            >
              Verify demo code
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

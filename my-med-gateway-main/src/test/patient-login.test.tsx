import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PatientLoginForm } from "@/routes/patient-login";
import { PatientSessionGate, PATIENT_DEMO_SESSION_KEY } from "@/components/PatientSessionGate";

const navigateMock = vi.hoisted(() => vi.fn());
vi.mock("@tanstack/react-router", async (importOriginal) => {
  const router = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...router,
    Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
    useNavigate: () => navigateMock,
  };
});

describe("Patient demo login", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    navigateMock.mockClear();
  });

  it("validates identity details and grants a tab-only session after verifying the displayed code", () => {
    const onVerified = vi.fn();
    render(<PatientLoginForm onVerified={onVerified} />);

    fireEvent.click(screen.getByRole("button", { name: "Send Demo OTP" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid name");

    fireEvent.change(screen.getByLabelText("Patient name"), { target: { value: "Ananya Rao" } });
    fireEvent.change(screen.getByLabelText("Mobile number"), { target: { value: "9876543210" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Demo OTP" }));

    const code = screen.getByTestId("patient-demo-otp").textContent;
    expect(code).toMatch(/^\d{6}$/);
    fireEvent.change(screen.getByLabelText("Enter 6-digit OTP"), { target: { value: code } });
    fireEvent.click(screen.getByRole("button", { name: "Verify OTP" }));

    expect(onVerified).toHaveBeenCalledOnce();
    expect(window.sessionStorage.getItem(PATIENT_DEMO_SESSION_KEY)).toBe("verified");
    expect(window.sessionStorage.length).toBe(1);
  });

  it("rejects invalid mobile numbers and limits repeated incorrect verification attempts", () => {
    render(<PatientLoginForm onVerified={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Patient name"), { target: { value: "Ananya Rao" } });
    fireEvent.change(screen.getByLabelText("Mobile number"), { target: { value: "12345" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Demo OTP" }));
    expect(screen.getByRole("alert")).toHaveTextContent("valid 10-digit Indian mobile number");

    fireEvent.change(screen.getByLabelText("Mobile number"), { target: { value: "9876543210" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Demo OTP" }));
    const correctCode = screen.getByTestId("patient-demo-otp").textContent;
    const wrongCode = correctCode === "000000" ? "000001" : "000000";
    const input = screen.getByLabelText("Enter 6-digit OTP");

    for (let attempt = 0; attempt < 5; attempt += 1) {
      fireEvent.change(input, { target: { value: wrongCode } });
      fireEvent.click(screen.getByRole("button", { name: "Verify OTP" }));
    }

    expect(screen.getByRole("alert")).toHaveTextContent("Too many incorrect attempts");
    expect(screen.getByRole("button", { name: "Verify OTP" })).toBeDisabled();
  });

  it("redirects to login without a demo session and renders protected content with one", async () => {
    const protectedPage = render(
      <PatientSessionGate>
        <p>Patient-only content</p>
      </PatientSessionGate>,
    );

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        expect.objectContaining({ to: "/patient-login", replace: true }),
      );
    });
    expect(screen.queryByText("Patient-only content")).not.toBeInTheDocument();

    protectedPage.unmount();
    window.sessionStorage.setItem(PATIENT_DEMO_SESSION_KEY, "verified");
    render(
      <PatientSessionGate>
        <p>Patient-only content</p>
      </PatientSessionGate>,
    );
    expect(await screen.findByText("Patient-only content")).toBeInTheDocument();
  });
});

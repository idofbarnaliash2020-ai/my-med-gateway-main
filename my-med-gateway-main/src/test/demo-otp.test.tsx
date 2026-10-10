import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DemoOtpDialog } from "@/components/DemoOtpDialog";

function readDemoCode() {
  const code = screen.getByTestId("demo-otp-code").textContent;
  if (!code) throw new Error("Demo code was not rendered");
  return code;
}

describe("Demo OTP verification", () => {
  it("accepts the displayed code once and runs the verified action", () => {
    const onVerified = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <DemoOtpDialog
        open
        onOpenChange={onOpenChange}
        purpose="share demo records"
        destination="fictional patient"
        onVerified={onVerified}
      />,
    );

    const code = readDemoCode();
    fireEvent.change(screen.getByLabelText("Enter 6-digit demo code"), {
      target: { value: code },
    });
    expect(screen.getByLabelText("Enter 6-digit demo code")).toHaveValue(code);
    fireEvent.click(screen.getByRole("button", { name: "Verify demo code" }));

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onVerified).toHaveBeenCalledOnce();
  });

  it("locks verification after five incorrect attempts", () => {
    render(
      <DemoOtpDialog
        open
        onOpenChange={vi.fn()}
        purpose="submit a demo request"
        destination="test contact"
        onVerified={vi.fn()}
      />,
    );

    const correctCode = readDemoCode();
    const incorrectCode = correctCode === "000000" ? "000001" : "000000";
    const input = screen.getByLabelText("Enter 6-digit demo code");
    const verifyButton = screen.getByRole("button", { name: "Verify demo code" });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      fireEvent.change(input, { target: { value: incorrectCode } });
      fireEvent.click(verifyButton);
    }

    expect(screen.getByRole("alert")).toHaveTextContent("Too many attempts");
    expect(verifyButton).toBeDisabled();
  });
});

const OTP_LENGTH = 6;

export function generateDemoOtp() {
  const value = new Uint32Array(1);
  globalThis.crypto.getRandomValues(value);
  return String(value[0]! % 1_000_000).padStart(OTP_LENGTH, "0");
}

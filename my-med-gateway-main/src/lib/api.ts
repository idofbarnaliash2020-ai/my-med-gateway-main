const configuredApiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const API_URL = configuredApiUrl.replace(/\/+$/, "");

export interface AmbulanceRequestPayload {
  pickup: string;
  destination: string;
  category: string;
  name: string;
  phone: string;
  notes?: string;
}

export interface AmbulanceRequestResponse {
  success: boolean;
  request_id: string;
  status: string;
  message: string;
}

export async function createAmbulanceRequest(
  request: AmbulanceRequestPayload,
): Promise<AmbulanceRequestResponse> {
  const response = await fetch(`${API_URL}/api/ambulance-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  const result = (await response.json().catch(() => null)) as
    | (AmbulanceRequestResponse & { detail?: string })
    | null;

  if (!response.ok) {
    throw new Error(result?.detail ?? "Could not save the ambulance request.");
  }

  if (!result?.request_id) {
    throw new Error("The backend returned an invalid response.");
  }

  return result;
}

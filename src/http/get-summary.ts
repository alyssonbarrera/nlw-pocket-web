import type { SummaryDTO } from "@/dtos/summary-dto";

export async function getSummary(): Promise<SummaryDTO> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/summary`);
  const data = await response.json();
  return data.summary;
}

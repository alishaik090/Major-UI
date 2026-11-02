import { useCallback, useState } from "react";
import { apiClient } from "../config/api";
import type { GatewayAnalysis, Organ } from "../types/analysis";

interface GatewayError {
  error?: { message?: string };
}

export function useAnalysis() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const analyze = useCallback(async (image: File, organ: Organ): Promise<GatewayAnalysis> => {
    setIsSubmitting(true);
    setError(undefined);
    const body = new FormData();
    body.append("image", image);
    body.append("organ", organ);
    try {
      const response = await apiClient.post<GatewayAnalysis>("/predict", body);
      return response.data;
    } catch (caught) {
      const gatewayError = caught as { response?: { data?: GatewayError }; message?: string };
      const message = gatewayError.response?.data?.error?.message ?? gatewayError.message ?? "Unable to complete the analysis request.";
      setError(message);
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { analyze, isSubmitting, error, clearError: () => setError(undefined) };
}

import "dotenv/config";

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  port: positiveInteger(process.env.PORT, 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  requestTimeoutMs: positiveInteger(process.env.REQUEST_TIMEOUT_MS, 30_000),
  maxUploadBytes: positiveInteger(process.env.MAX_UPLOAD_MB, 15) * 1024 * 1024,
};

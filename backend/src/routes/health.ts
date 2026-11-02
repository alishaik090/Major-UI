import { Router } from "express";
import { SERVICES, SUPPORTED_ORGANS } from "../config/services.js";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    services: Object.fromEntries(SUPPORTED_ORGANS.map((organ) => [organ, { connected: Boolean(SERVICES[organ].url) }])),
  });
});

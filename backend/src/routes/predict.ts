import axios from "axios";
import FormData from "form-data";
import { Router } from "express";
import multer from "multer";
import { env } from "../config/env.js";
import { isOrgan, SERVICES } from "../config/services.js";
import { HttpError } from "../utils/http-error.js";

const acceptedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/tiff"]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.maxUploadBytes, files: 1 },
  fileFilter: (_req, file, callback) => {
    callback(null, acceptedMimeTypes.has(file.mimetype));
  },
});

export const predictRouter = Router();

predictRouter.post("/predict", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) throw new HttpError(400, "Please upload a PNG, JPEG, WebP, or TIFF image.", "IMAGE_REQUIRED");

    const organ = String(req.body.organ ?? "").toLowerCase().trim();
    if (!isOrgan(organ)) throw new HttpError(400, "Select a supported organ: brain, kidney, or retina.", "INVALID_ORGAN");

    const service = SERVICES[organ];
    if (!service.url) throw new HttpError(503, "Selected organ service is not connected.", "SERVICE_UNAVAILABLE");

    const form = new FormData();
    form.append("image", req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });
    form.append("organ", organ);

    const downstream = await axios.post(service.url, form, {
      headers: { ...form.getHeaders(), "x-request-id": req.requestId ?? "" },
      timeout: env.requestTimeoutMs,
      maxBodyLength: env.maxUploadBytes,
      maxContentLength: env.maxUploadBytes,
      validateStatus: () => true,
    });

    if (downstream.status >= 400) {
      throw new HttpError(502, "The selected organ service returned an invalid response.", "INVALID_SERVICE_RESPONSE");
    }
    if (!downstream.data || typeof downstream.data !== "object") {
      throw new HttpError(502, "The selected organ service returned an invalid response.", "INVALID_SERVICE_RESPONSE");
    }

    res.status(200).json({
      organ,
      service: service.label,
      receivedAt: new Date().toISOString(),
      result: downstream.data,
    });
  } catch (error) {
    next(error);
  }
});

import type { ErrorRequestHandler } from "express";
import multer from "multer";
import { AxiosError } from "axios";
import { HttpError } from "../utils/http-error.js";

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  let statusCode = 500;
  let code = "INTERNAL_ERROR";
  let message = "The gateway could not complete this request.";

  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
  } else if (error instanceof multer.MulterError) {
    statusCode = 400;
    code = "UPLOAD_ERROR";
    message = error.code === "LIMIT_FILE_SIZE" ? "The uploaded image exceeds the size limit." : "The uploaded image could not be processed.";
  } else if (error instanceof AxiosError) {
    statusCode = error.code === "ECONNABORTED" ? 504 : 502;
    code = error.code === "ECONNABORTED" ? "SERVICE_TIMEOUT" : "SERVICE_NETWORK_ERROR";
    message = error.code === "ECONNABORTED" ? "The selected organ service timed out." : "The selected organ service could not be reached.";
  }

  if (statusCode >= 500) console.error(`[${req.requestId ?? "unknown"}]`, error);
  res.status(statusCode).json({ error: { code, message, requestId: req.requestId } });
};

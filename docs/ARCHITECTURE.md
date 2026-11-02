# Architecture

```text
React client
  │ multipart image + organ
  ▼
Express API gateway (/api/predict)
  │ validates image and supported organ
  │ selects an environment-configured service URL
  ▼
Independent organ service (not included in this repository)
```

The gateway performs no image analysis or inference. When an organ URL is empty, it returns HTTP `503` with `Selected organ service is not connected.`

## Adding an organ

1. Add an organ definition in `backend/src/config/services.ts`.
2. Add its environment variable to `backend/.env.example` and deployment settings.
3. Add the organ to `frontend/src/types/analysis.ts` and its display label in `components/analysis.tsx`.
4. Ensure the independent service accepts multipart `image` and returns a JSON object.

# MedScope AI — Multi-Organ Medical Image Analysis Platform

A standalone React UI and Express API gateway for independently deployed medical-image services. It deliberately contains **no ML model, inference logic, Python project, weights, or simulated prediction**.

## Structure

```text
medical-platform/
├── frontend/    # React 19, TypeScript, Vite, Tailwind, React Router
├── backend/     # Express, TypeScript, Multer, Axios gateway
└── docs/        # Integration documentation
```

## Start locally

The current environment has Node.js but a broken npm installation; repair/install npm first, then run:

```powershell
cd medical-platform\backend
Copy-Item .env.example .env
npm install
npm run dev
```

In another terminal:

```powershell
cd medical-platform\frontend
Copy-Item .env.example .env
npm install
npm run dev
```

The frontend runs through the Vite `/api` proxy during development. Configure `BRAIN_API`, `KIDNEY_API`, or `RETINA_API` in `backend/.env` only when that independent service is ready. Empty values return an intentional `503` response.

## API

`POST /api/predict` accepts `multipart/form-data`:

- `image`: PNG, JPEG, WebP, or TIFF image, maximum 15 MB.
- `organ`: `brain`, `kidney`, or `retina`.

`GET /api/health` reports whether each configured organ service has a URL. Downstream output must be JSON; the UI displays it transparently without fabricating a prediction.

## Security and deployment

The gateway uses Helmet, restrictive CORS, request IDs, upload limits, and timeouts. Before deployment, set the allowed `CORS_ORIGIN`, use HTTPS, add authentication/authorization, rate limiting, audit logging, retention controls, and service-specific privacy review.

See [Architecture](docs/ARCHITECTURE.md) for integration and extension details.

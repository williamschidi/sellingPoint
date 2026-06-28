# API layer (mock → backend)

This folder is the **only** place UI code should fetch remote data. Pages and components import from `api/services/*`, never from `api/mock/*` directly.

## Switching to the backend

Set in `.env`:

```env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=https://your-api.example.com/api
```

`api/config.js` reads these flags. Each service branches on `USE_MOCK_DATA`:

| Service | Mock implementation | Backend replacement |
|---------|---------------------|---------------------|
| `propertyService.js` | `mock/handlers.js` | `GET /properties`, `GET /properties/:id`, `GET /properties/search` |
| `inspectionService.js` | `mock/handlers.js` + `lib/storage/inspectionStorage.js` | `POST /inspection-requests`, `GET /inspection-requests`, slots endpoints |
| `authService.js` | `lib/auth/mockAuthStorage.js` | `POST /auth/sign-in`, `sign-up`, `sign-out`, `GET /auth/session` |
| `savedSearchService.js` | `localStorage` | `GET/POST/DELETE /user/saved-searches` |

## Layout

```
api/
├── config.js          # USE_MOCK_DATA, API_BASE_URL
├── client.js          # fetch wrapper for real API (credentials/TODO when backend ships)
├── mock/
│   ├── data.js        # Static fixture catalogue
│   └── handlers.js    # Async mock handlers (simulate network delay)
└── services/          # Public API consumed by React — swap mock/real here only
```

## Rules for new endpoints

1. Add the function to the appropriate `services/*.js` file.
2. Implement `mock*` handler in `mock/handlers.js` if needed for local dev.
3. Add `if (USE_MOCK_DATA)` branch returning mock; else `apiRequest(...)`.
4. Keep normalization/business logic in `lib/`, not in mock handlers.

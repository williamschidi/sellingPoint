# Selling Point API (Express + MongoDB)

Planned backend for when mock data is disabled on the frontend.

## Frontend switch

In `.env`:

```env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:5000/api
```

## Endpoints to implement

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/properties/:id` | Property details |
| GET | `/api/inspections/time-slots` | Available time slots |
| GET | `/api/properties/:propertyId/inspection-slots` | Booked slots for a property |
| POST | `/api/inspection-requests` | Create inspection booking |

## POST `/api/inspection-requests` body

```json
{
  "propertyId": "SP-001",
  "date": "2026-06-26",
  "time": "10:00 AM",
  "client": {
    "fullName": "Jane Doe",
    "phone": "+2348012345678",
    "notes": "Optional note"
  },
  "confirmed": true
}
```

## MongoDB collections (suggested)

### `properties`

Same fields as `src/api/mock/data.js` → `mockProperties[0]`.

### `inspection_slots`

```js
{
  propertyId: String,
  date: String,       // "yyyy-MM-dd"
  time: String,       // "9:00 AM"
  status: "booked" | "blocked"
}
```

### `inspection_requests`

```js
{
  propertyId: String,
  date: String,
  time: String,
  client: {
    fullName: String,
    phone: String,
    notes: String
  },
  confirmed: Boolean,
  status: "pending" | "confirmed" | "cancelled",
  createdAt: Date
}
```

## Express starter structure

```
backend/
  src/
    index.js
    config/db.js
    models/
      Property.js
      InspectionSlot.js
      InspectionRequest.js
    routes/
      properties.js
      inspections.js
```

The frontend `src/api/services/*.js` files already call these routes when `VITE_USE_MOCK_DATA=false`.

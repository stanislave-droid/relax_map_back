# RelaxMap — Backend API

> Server platform for cataloging leisure locations: location creation, categorization by type and region, user rating and review system.

## 1. About the Project

**RelaxMap Backend** is a REST API built with Node.js and Express that powers the client application for discovering and evaluating leisure destinations.

Business problems addressed by the system:

- centralized maintenance of a location database with photos, descriptions, coordinates, and ratings;
- content structuring by types and regions of Ukraine;
- building trust through verified user reviews;
- user profile and author content management.

Database: MongoDB (Mongoose). Authentication: session-based with token rotation.

## 2. Key Features

**Users and Access:**

- registration and login with email / password;
- session token refresh and secure logout;
- user profile, viewing other users' profiles;
- name and avatar updates.

**Locations:**

- public catalog with pagination, search, filters, and sorting;
- detailed location card;
- creation and editing of locations by authenticated users.

**Feedback:**

- rating from 1 to 5 and text review;
- viewing reviews by location;
- aggregated rating and review counter.

**Directories:**

- list of location types: `GET /api/categories/types`;
- list of regions: `GET /api/categories/regions`.

## 3. Tech Stack

| Category       | Technology                               |
| -------------- | ---------------------------------------- |
| Runtime        | Node.js, ES Modules                      |
| HTTP Framework | Express 5                                |
| DB / ODM       | MongoDB, Mongoose 9                      |
| Auth / Crypto  | bcrypt, crypto.randomUUID                |
| Validation     | Celebrate, Joi                           |
| Files          | Multer, Cloudinary SDK v2                |
| Security       | Helmet, CORS, cookie-parser, http-errors |
| Configuration  | dotenv                                   |
| Logging        | pino-http, pino-pretty                   |
| Code Quality   | ESLint, Prettier, EditorConfig           |
| Dev Mode       | Nodemon                                  |

## 4. Project Architecture

```text
src/
├── server.js              # Express initialization, CORS, routes, error handling
├── db/connectToMongoDB.js # MongoDB connection
├── routes/                # endpoint definitions
├── controllers/           # request business logic
├── services/              # sessions, users, categories
├── models/                # Mongoose schemas
├── validations/           # Celebrate Joi schemas
├── middleware/            # authenticate, multer, logger, errorHandler
├── utils/                 # Cloudinary, Mongoose helpers
└── constants/             # token lifetimes, regex, sorting
```

Principles: thin routes, input validation, reusable service layer, centralized error handling.

## 5. Quick Start

**Requirements:** Node.js 20+, MongoDB 6+, Cloudinary account, npm 10+.

```bash
# 1. Cloning
git clone https://github.com/stanislave-droid/relax_map.git
cd relax_map_back

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env
# fill in values according to section 6

# 4. Run in development mode
npm run dev

# 5. Run in production mode
npm start
```

Default server: `https://relax-map-back-z38k.onrender.com/`.

Checking directories:

```bash
curl https://relax-map-back-z38k.onrender.com/api/categories/types
curl "https://relax-map-back-z38k.onrender.com/api/locations?page=1&limit=10"
```

## 6. Environment Variables

`.env` file (example — `.env.example`):

| Variable                | Purpose                       | Required |
| ----------------------- | ----------------------------- | -------- |
| `PORT`                  | HTTP server port, e.g. `3000` | Yes      |
| `NODE_ENV`              | `development` / `production`  | Yes      |
| `MONGO_URL`             | MongoDB connection string     | Yes      |
| `FRONTEND_DOMAIN`       | Allowed frontend CORS origin  | Yes      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name         | Yes      |
| `CLOUDINARY_API_KEY`    | Cloudinary API key            | Yes      |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret         | Yes      |

> The `.env` file is not stored in the repository. For production, use the hosting platform's secret manager.

## 7. Scripts

| Command       | Action                                 |
| ------------- | -------------------------------------- |
| `npm start`   | Production start: `node src/server.js` |
| `npm run dev` | Development start with auto-reload     |
| `npm test`    | Not configured (planned)               |

## 8. API Overview

Base URL: `/api`. Exchange format: JSON. Authentication: `sessionId`, `accessToken`, `refreshToken` cookies.

### 8.1 Authentication — `/api/auth`

| Method | Endpoint    | Access  | Request Body                |
| ------ | ----------- | ------- | --------------------------- |
| POST   | `/register` | Public  | `{ name, email, password }` |
| POST   | `/login`    | Public  | `{ email, password }`       |
| POST   | `/refresh`  | Cookie  | —                           |
| POST   | `/logout`   | Private | —                           |

Registration example:

```bash
curl -X POST https://relax-map-back-z38k.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"name":"Olena","email":"olena@example.com","password":"SecurePass123"}'
```

### 8.2 Locations — `/api/locations`

| Method | Endpoint       | Access  | Description                                                      |
| ------ | -------------- | ------- | ---------------------------------------------------------------- |
| GET    | `/`            | Public  | List: `page, limit, region, type, search, sortBy, sortDirection` |
| GET    | `/:locationId` | Public  | Location details                                                 |
| POST   | `/`            | Private | Creation + `multipart/form-data image`                           |
| PATCH  | `/:locationId` | Private | Field and photo updates                                          |

Search example:

```bash
curl "https://relax-map-back-z38k.onrender.com//api/locations?search=Карпати&region=Івано-Франківська&type=Гори&page=1&limit=10&sortBy=rate&sortDirection=desc"
```

### 8.3 Users — `/api/users`

| Method | Endpoint             | Access  | Description                            |
| ------ | -------------------- | ------- | -------------------------------------- |
| GET    | `/current`           | Private | Current user                           |
| GET    | `/:userId`           | Public  | Public profile                         |
| GET    | `/:userId/locations` | Public  | Author locations with pagination       |
| PATCH  | `/me/avatar`         | Private | Update `name` and `avatar` (multipart) |

### 8.4 Categories — `/api/categories`

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | `/types`   | Location types |
| GET    | `/regions` | Regions        |

### 8.5 Feedback — `/api/feedbacks`

| Method | Endpoint                      | Access  | Description                  |
| ------ | ----------------------------- | ------- | ---------------------------- |
| GET    | `/?page=1&limit=3`            | Public  | All feedback                 |
| GET    | `/:locationId?page=1&limit=3` | Public  | Location feedback            |
| POST   | `/:locationId`                | Private | `{ rate: 1-5, description }` |

Successful responses: `200 OK`, creation — `201 Created`. Errors are returned in the standardized `http-errors` and Celebrate format.

## 9. Authentication and Security

- Password hashing with bcrypt (10 rounds).
- Access token: 15 minutes. Refresh token: 1 day with rotation (old session is deleted).
- Cookies: `httpOnly, Secure, SameSite=None`.
- Header protection — Helmet. CORS — only for `FRONTEND_DOMAIN` with `credentials: true`.
- Email validation by regex, password — 8–128 characters, ObjectId — via Mongoose helper.
- Password is excluded from API responses at the model level.

Production recommendations: HTTPS is mandatory, add rate limiting for `/api/auth`, audit CORS domains.

## 10. Data Models

- **User:** `name, email (unique), password (hash), avatarUrl, articlesAmount`, timestamps.
- **Location:** `image, name (3-96), description (20-6000), locationType, region, rate (0-5), ownerId, feedbacksId[], feedbacksCount, coordinates {lat, lon}`, timestamps.
- **Feedback:** `userName, ownerId, rate (1-5), description, locationId`, timestamps.
- **Category:** `type, slug, shortDescription`.
- **Region:** `region, slug, level, note`.
- **Session:** `userId, accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil`.

## 11. File Uploads

Multer in memory storage mode → buffer is passed to Cloudinary:

- avatars: `relax-map/avatars`, 500×500, `fill`, `gravity:auto`;
- location photos: `relax-map/locations`, 750×500;
- auto-optimization: `fetch_format:auto, quality:auto`.

Type restrictions for location updates: `image/jpeg, image/jpg, image/png`.

## 12. Error Handling and Logging

- `notFoundHandler` — for unknown routes (404).
- `celebrate errors()` — validation errors (400).
- `errorHandler` — centralized error format.
- `pino-http` — structured request logging.

## 13. Deployment

1. Set environment variables on the hosting platform (Render / Railway / VPS).
2. Open access to MongoDB Atlas by IP or VPC.
3. Configure HTTPS (mandatory for `Secure` cookies).
4. Start command: `npm install && npm start`.
5. Health check: `GET /api/categories/types` should return `200`.

## 14. Project Team

The project was implemented by a team of 12 contributors.

- **[stanislave-droid](https://github.com/stanislave-droid)** — repository owner, Team Lead. Users, locations, authentication, Cloudinary / Multer, sorting and fixes.
- **[Ellen-HI](https://github.com/Ellen-HI)** — session refresh, session model and service, session fixes, user update.
- **[LiliaMamutova](https://github.com/LiliaMamutova)** — user model, registration error messages.
- **[Viktor-8888](https://github.com/Viktor-8888)** — current user profile.
- **[Roman-Bieloshchuk](https://github.com/Roman-Bieloshchuk)** — logout.
- **[HyriaRoman](https://github.com/HyriaRoman)** — user locations.
- **[OlgaDovgal](https://github.com/OlgaDovgal)** — location creation, getting location by ID, controller fix.
- **[oleksandr0681](https://github.com/oleksandr0681)** — location update validation, Multer setup, locations router.
- **[KateB713](https://github.com/KateB713)** — category types and category response format.
- **[LaraMach](https://github.com/LaraMach)** — regions and feedback counter.
- **[AnastasiiaAghfir](https://github.com/AnastasiiaAghfir)** — getting feedback.
- **[Guijeen](https://github.com/Guijeen)** — getting latest feedback, creating new location feedback.

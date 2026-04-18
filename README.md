# NeighborShare

NeighborShare is a full-stack community item-sharing platform where residents can register, list items, browse what others have posted, and send booking requests to borrow items locally.

This repository contains:

- A Spring Boot backend with JWT-based authentication
- A React + Vite frontend in `neighbor-share-frontend/`
- MySQL persistence for users, items, and booking requests

## What the Code Does

The application supports a simple neighborhood rental flow:

1. A user registers or logs in.
2. The backend returns a JWT token.
3. The frontend stores that token in `localStorage`.
4. Authenticated users can create item listings.
5. Other users can browse items and request bookings.
6. Item owners can approve or reject incoming requests.

## Tech Stack

### Backend

- Java 17
- Spring Boot 4.0.5
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL
- JWT (`jjwt`)
- Lombok

### Frontend

- React
- Vite
- Axios
- React Router

## Project Structure

```text
backend/
├── src/main/java/com/neighborshare/backend
│   ├── config/        # Security configuration
│   ├── controller/    # REST API controllers
│   ├── dto/           # Request/response payloads
│   ├── entity/        # JPA entities
│   ├── repository/    # Spring Data repositories
│   ├── security/      # JWT filter, token utility, user details service
│   └── service/       # Business logic
├── src/main/resources/application.properties
├── pom.xml
└── neighbor-share-frontend/
    ├── src/pages/     # UI screens
    ├── src/components/
    └── src/services/api.js
```

## Backend Overview

### Main Domain Models

- `User`
  - Stores name, email, password, phone, address, community, role, trust score, and creation time
- `Item`
  - Stores item details, pricing, deposit, image data URL, owner, and availability status
- `Booking`
  - Connects a borrower, owner, and item with a start date, end date, and booking status

### Security

- Public routes:
  - `/api/auth/**`
- Protected routes:
  - Everything else requires a Bearer token
- JWT authentication is handled by:
  - `JwtFilter`
  - `JwtUtil`
  - `CustomUserDetailsService`

## API Endpoints

### Auth

#### `POST /api/auth/register`

Registers a new user.

Request body:

```json
{
  "name": "Aryan Reddy",
  "email": "aryan@example.com",
  "password": "secret123",
  "phone": "9999999999",
  "address": "Flat 402",
  "community": "Green Valley Residency"
}
```

Response:

```json
{
  "token": "jwt-token",
  "message": "User registered successfully"
}
```

#### `POST /api/auth/login`

Logs in an existing user.

Request body:

```json
{
  "email": "aryan@example.com",
  "password": "secret123"
}
```

### Users

#### `GET /api/users/me`

Returns the currently authenticated user.

### Items

#### `POST /api/items`

Creates a new item listing for the logged-in user.

Request body:

```json
{
  "name": "Drill Machine",
  "description": "Useful for home repair work",
  "category": "Tools",
  "pricePerDay": 100,
  "depositAmount": 500,
  "imageUrl": "data:image/png;base64,..."
}
```

#### `GET /api/items`

Returns all items.

#### `GET /api/items/{id}`

Returns a single item by id.

#### `GET /api/items/my-items`

Returns items created by the logged-in user.

#### `DELETE /api/items/{id}`

Deletes an item if it belongs to the logged-in user.

### Bookings

#### `POST /api/bookings`

Creates a booking request.

Request body:

```json
{
  "itemId": 1,
  "startDate": "2026-04-20",
  "endDate": "2026-04-22"
}
```

#### `GET /api/bookings/my`

Returns bookings made by the logged-in user.

#### `GET /api/bookings/incoming`

Returns booking requests for items owned by the logged-in user.

#### `PUT /api/bookings/approve/{id}`

Approves a booking request.

#### `PUT /api/bookings/reject/{id}`

Rejects a booking request.

## Frontend Overview

The frontend lives in `neighbor-share-frontend/` and uses Axios with a shared base URL:

- Base API URL: `http://localhost:8080/api`
- JWT token source: `localStorage.getItem("token")`

### Main Pages

- `Dashboard.jsx`
  - Landing page and feature overview
- `Login.jsx`
  - Authenticates existing users
- `Register.jsx`
  - Creates a new user account
- `AddItem.jsx`
  - Creates new item listings and converts uploaded images to Base64
- `Items.jsx`
  - Shows all items and lets users request bookings
- `MyBookings.jsx`
  - Shows bookings created by the logged-in user
- `IncomingRequests.jsx`
  - Lets item owners approve or reject booking requests

## How to Run the Project

### 1. Start MySQL

Create a database named:

```sql
CREATE DATABASE neighborshare_db;
```

### 2. Configure the backend

Current configuration is stored in `src/main/resources/application.properties`.

The code expects:

- Database URL: `jdbc:mysql://localhost:3306/neighborshare_db`
- Username: `root`
- Backend port: `8080`

### 3. Run the backend

Using Maven wrapper:

```bash
./mvnw spring-boot:run
```

Or using installed Maven:

```bash
mvn spring-boot:run
```

### 4. Run the frontend

```bash
cd neighbor-share-frontend
npm install
npm run dev
```

The frontend will connect to the backend at `http://localhost:8080`.

## Database Behavior

Hibernate is configured with:

```properties
spring.jpa.hibernate.ddl-auto=update
```

That means tables are created or updated automatically from the entity classes.

## Current Implementation Notes

These behaviors are visible in the current codebase:

- Passwords are securely hashed with BCrypt before storage.
- All non-auth endpoints require JWT authentication.
- CORS is open to all origins.
- Item images are stored as Base64 text in the database.
- Booking approval and rejection endpoints do not currently verify that the acting user owns the item.
- The `Items.jsx` page currently sends fixed booking dates: `2026-04-20` to `2026-04-22`.
- There is no advanced validation yet for booking overlap, item availability windows, payments, ratings, or trust score updates.
- Sensitive values like the database password and JWT secret are currently hardcoded in `application.properties`; environment-based configuration would be better for production.

## Suggested Next Improvements

- Move secrets to environment variables
- Add global exception handling with clear API error responses
- Validate booking ownership before approve/reject actions
- Prevent overlapping bookings
- Add pagination and filters for items
- Add tests for services and controllers
- Support real image storage instead of large Base64 payloads

## Useful Files

- [pom.xml](/Users/aryanreddy18/Documents/NeighborShare/backend/pom.xml)
- [application.properties](/Users/aryanreddy18/Documents/NeighborShare/backend/src/main/resources/application.properties)
- [SecurityConfig.java](/Users/aryanreddy18/Documents/NeighborShare/backend/src/main/java/com/neighborshare/backend/config/SecurityConfig.java)
- [AuthService.java](/Users/aryanreddy18/Documents/NeighborShare/backend/src/main/java/com/neighborshare/backend/service/AuthService.java)
- [ItemService.java](/Users/aryanreddy18/Documents/NeighborShare/backend/src/main/java/com/neighborshare/backend/service/ItemService.java)
- [BookingService.java](/Users/aryanreddy18/Documents/NeighborShare/backend/src/main/java/com/neighborshare/backend/service/BookingService.java)
- [App.jsx](/Users/aryanreddy18/Documents/NeighborShare/backend/neighbor-share-frontend/src/App.jsx)
- [api.js](/Users/aryanreddy18/Documents/NeighborShare/backend/neighbor-share-frontend/src/services/api.js)

## Summary

NeighborShare is a working full-stack local sharing platform with JWT auth, item listing, and booking management already implemented. The README now documents the actual code structure, setup steps, API surface, and the main limitations that would matter for further development.

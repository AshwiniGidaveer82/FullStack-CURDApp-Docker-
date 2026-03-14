# 📦 Fullstack CRUD Application  
Angular + Node.js + MongoDB + Docker Compose

---
# 📌 Project Overview

This project is a complete end-to-end fullstack CRUD application built using:

- Frontend: Angular (TypeScript)
- Backend: Node.js + Express (TypeScript)
- Database: MongoDB
- Containerization: Docker
- Orchestration: Docker Compose

The application supports:

- Create a book
- Read books (with pagination)
- Update a book
- Delete a book

All services are fully containerized and communicate through Docker network.

---

# 🏗 System Architecture

```
                ┌─────────────────────┐
                │      Angular        │
                │      Frontend       │
                │     (Nginx)         │
                │   http://localhost  │
                └──────────┬──────────┘
                           │ HTTP Requests
                           ▼
                ┌─────────────────────┐
                │     Node Backend    │
                │  Express + TS       │
                │ http://localhost:5000 │
                └──────────┬──────────┘
                           │ Mongo Driver
                           ▼
                ┌─────────────────────┐
                │      MongoDB        │
                │   Port: 27017       │
                │   Docker Volume     │
                └─────────────────────┘
```

---

# 📂 Folder Structure

```
fullstack-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# 🐳 Docker Services

The project runs 3 services:

| Service   | Technology | Port |
|------------|------------|-------|
| frontend   | Angular + Nginx | 80 |
| backend    | Node.js + Express | 5000 |
| mongodb    | Official MongoDB Image | 27017 |

---

# 🚀 How To Run The Project

## 1️⃣ Build and Start All Services

From the project root:

```bash
docker compose up --build
```

This command will:

- Build backend Docker image
- Build frontend Docker image
- Pull MongoDB official image
- Create Docker network
- Create MongoDB volume
- Start all containers

---

## 2️⃣ Access the Application

Frontend:

```
http://localhost:4200
```

Backend API:

```
http://localhost:5000/books
```

MongoDB:

```
mongodb://localhost:27017
```

---

## 3️⃣ Stop the Application

```bash
docker compose down
```

To remove volumes (delete database data):

```bash
docker compose down -v
```

---

# 🔗 Service Communication

Docker Compose creates a shared network automatically.

Services communicate using service names:

Backend connects to MongoDB using:

```
mongodb://mongodb:27017/appdb
```

- `mongodb` is the Docker service name
- Not `localhost`

Frontend connects to backend using:

```
http://backend:5000
```

Docker automatically resolves service names using internal DNS.

---

# 📄 API Endpoints

## Create Book
```
POST /books
```

## Get Books with Pagination
```
GET /books?page=1&limit=10
```

## Update Book
```
PUT /books/:id
```

## Delete Book
```
DELETE /books/:id
```

---

# 📚 Pagination Explanation

Pagination is implemented using:

- page
- limit
- skip
- total count

### Example Logic (Backend)

```ts
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;

const total = await Book.countDocuments();
const books = await Book.find().skip(skip).limit(limit);

res.json({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  data: books
});
```

### Example Response

```json
{
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "data": []
}
```

---

# 🌍 Environment Variables

## Backend Environment Variables

```
PORT=5000
MONGO_URL=mongodb://mongodb:27017/appdb
```

Why environment variables?

- Avoid hardcoding values
- Easy environment switching
- Better security practice

---

## Angular Environment Configuration

`environment.ts`

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

`environment.prod.ts`

```ts
export const environment = {
  production: true,
  apiUrl: 'http://backend:5000'
};
```

This ensures no hardcoded API URLs.

---

# 🏗 Production Build (Angular)

Angular production build:

```bash
ng build --configuration production
```

Production mode:

- Minified JavaScript
- Smaller bundle size
- AOT compilation
- Optimized performance

---

# 🧱 Multi-Stage Docker Build (Frontend)

Stage 1:
- Build Angular app using Node

Stage 2:
- Serve static files using Nginx

Benefits:

- Smaller final image
- Better performance
- Improved security

---

# 💾 MongoDB Persistence

Docker Compose uses a named volume:

```yaml
volumes:
  - mongo-data:/data/db
```

This ensures:

- Data persists after container restart
- Database is not lost

---

# 🧠 Concepts Covered

- Frontend–Backend integration
- REST API development
- MongoDB data persistence
- Pagination using skip & limit
- Docker containerization
- Docker Compose orchestration
- Service networking
- Environment-based configuration
- Production build optimization

---

# 🔄 Rebuild Everything From Scratch

```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

---

# 👨‍💻 Author
Ashwini Gidaveer

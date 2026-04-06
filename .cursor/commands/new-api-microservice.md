# New API Microservice/Resource (Node.js/Express)

You are scaffolding a new HTTP API **resource** or **microservice** using Node.js/Express/TS + Mongoose. **Always use `docs/MOP-API-MICROSERVICE.md` as source of truth**; align every step with it. Match `book` example in `backend/src`.

## Inputs (parse from user /command)

- **Resource** (singular PascalCase, e.g. `Product`)
- **plural** (kebab/plural lowercase, e.g. `products`)
- **Fields** (parse 'name:type required/optional', e.g. `title:String required, author:String required`)
- **mode**: `integrated` (default, add to main backend) or `microservice` (standalone)

Ask short question if missing.

## Checklist (execute in order)

1. **Model** — `backend/src/models/{Resource}.model.ts` per MOP.
2. **Controller** — `backend/src/controllers/{Resource}.controller.ts` (CRUD async w/ pagination).
3. **Router** — `backend/src/routes/{Resource}.routes.ts`.
4. **Registration** — Edit `backend/src/app.ts`: `app.use('/{plural}', require('./routes/{Resource}.routes'));` (import if needed).
5. **Frontend Service** (if Angular): `frontend/src/app/services/{Resource}.service.ts`.
If **microservice**:
6. Copy `backend/` → `backend-{plural}/`, replace book → Resource, new port/server.ts.
7. Copy/update Dockerfile, add docker-compose service, K8s deployment/service (copy backend-*, update names/ports/labels).

## DB/Env

Use existing MongoDB/mongoose connect (assume shared). No new DB unless specified.

## Docker/K8s

Microservice: New container/service, port 30XX sequential.

## Quality bar

- Types/imports match book (e.g. Request/Response).
- Pagination: page/limit/skip/countDocuments.
- Status 201 create.
- List all files edited/created.
- Example API calls: `curl -X POST http://localhost:3000/{plural} -d '{json}'`
- After changes: `cd backend && npm i && npm run dev` (or new backend).

No unrelated refactors.
